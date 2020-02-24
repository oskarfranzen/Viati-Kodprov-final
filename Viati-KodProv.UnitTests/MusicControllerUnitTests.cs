using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Viati_KodProv.Data.Contracts;
using Viati_KodProv.Data.Services;
using Viati_KodProv.Web.Controllers;
using Viati_KodProv.Web.DTOs;

namespace Viati_KodProv.UnitTests {

    [TestClass]
    public class MusicControllerTests {
        private readonly MusicController _sut;

        private readonly Mock<IRadioService> _radioServiceMock;

        public MusicControllerTests() {
            _radioServiceMock = new Mock<IRadioService>();
            _sut = new MusicController(_radioServiceMock.Object);
        }

        [TestMethod]
        public void Index_ShouldReturnOkResult() {
            var result = _sut.Index();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public async Task Labels_ShouldReturnJsonResult() {
            var result = await _sut.Labels(It.IsAny<DateTime>());
            Assert.IsInstanceOfType(result, typeof(JsonResult));
        }

        [TestMethod]
        public async Task Labels_ShouldCallRadioService_WithSuppliedDateTime_Once() {
            var expectedDateTime = DateTime.Now;
            await _sut.Labels(expectedDateTime);

            _radioServiceMock.Verify(x => x.GetSongList(expectedDateTime), Times.Once);
        }

        [TestMethod]
        public async Task Labels_ShouldGroupSongs_ByLabel() {
            var expectedLabel = "123";

            _radioServiceMock.Setup(mock => mock.GetSongList(It.IsAny<DateTime>())).ReturnsAsync(
                new SongList() {
                    Song = new [] {
                        new Song() {
                                Recordlabel = expectedLabel
                            },
                            new Song() {
                                Recordlabel = expectedLabel
                            }
                    }
                }
            );
            var result = await _sut.Labels(It.IsAny<DateTime>());
            var jsonResult = ((JsonResult)result).Value as IEnumerable<LabelDTO>;

            Assert.AreEqual(jsonResult.Count(), 1);
            Assert.AreEqual(jsonResult.First().LabelName, expectedLabel);
        }

        [TestMethod]
        public async Task Labels_ShouldCalculateTimes_ByLabel() {

            var expectedTime = 123456;
            var dateWithFormat = $"/date({expectedTime.ToString()})";

            _radioServiceMock.Setup(mock => mock.GetSongList(It.IsAny<DateTime>())).ReturnsAsync(
                new SongList() {
                    Song = new [] {
                        new Song() {
                            Starttimeutc = dateWithFormat,
                                Stoptimeutc = dateWithFormat
                        }
                    }
                }
            );
            var result = await _sut.Labels(It.IsAny<DateTime>());
            var jsonResult = ((JsonResult)result).Value as IEnumerable<LabelDTO>;

            Assert.AreEqual(jsonResult.First().Songs.First().SongInfo.StartTimeUtc, expectedTime);
            Assert.AreEqual(jsonResult.First().Songs.First().SongInfo.StopTimeUtc, expectedTime);

        }
    }
}