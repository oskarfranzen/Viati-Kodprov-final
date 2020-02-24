using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Viati_KodProv.Data.Clients;
using Viati_KodProv.Data.Contracts;
using Viati_KodProv.Data.Services;

namespace Viati_KodProv.UnitTests {

    [TestClass]
    public class RadioServiceUnitTests {
        private readonly RadioService _sut;
        private readonly Mock<IMusicClient> _clientMock;

        public RadioServiceUnitTests() {
            _clientMock = new Mock<IMusicClient>();

            _sut = new RadioService(_clientMock.Object);
        }

        [TestMethod]
        public async Task GetSongList_ShouldCallMusicClient_Once() {
            await _sut.GetSongList(It.IsAny<DateTime>());

            _clientMock.Verify(mock => mock.GetSongList(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<int>()),
                Times.Once);
        }

        [TestMethod]
        public async Task GetSongList_ShouldCallMusicClient_WithSuppliedDateTime() {
            var expectedDateTime = DateTime.Now;
            await _sut.GetSongList(expectedDateTime);

            _clientMock.Verify(mock => mock.GetSongList(It.IsAny<string>(), expectedDateTime, It.IsAny<int>()),
                Times.Once);
        }

        [TestMethod]
        public async Task GetSongList_ShouldReturnRetrievedSongList() {
            var expectedRecordLabel = "123";
            var retrievedSongList = new SongList() {
                Song = new [] { 
                    new Song() { 
                        Recordlabel = expectedRecordLabel 
                        } 
                    }
            };

            _clientMock.Setup(mock => mock.GetSongList(It.IsAny<string>(), It.IsAny<DateTime>(), It.IsAny<int>()))
                .ReturnsAsync(retrievedSongList);

            var songList = await _sut.GetSongList(It.IsAny<DateTime>());

            Assert.AreEqual(songList.Song.Count(), retrievedSongList.Song.Count());
            Assert.AreEqual(songList.Song.First().Recordlabel, expectedRecordLabel);

        }

    }

}