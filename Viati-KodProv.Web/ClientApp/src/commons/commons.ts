import { ILabelDTO } from "../services/contracts/labelResponse.contract";

const labelPath = '/label/';

const findLabelByName = (labels: ILabelDTO[], labelName: string) => labels.filter(label => label.labelName === labelName)[0]

const createFilteredSet = (labels: ILabelDTO[], searchString: string) => {
    if (searchString.length === 0) {
        return labels;
    }
    const searchTerms = searchString.split(' ');


    return labels.reduce((aggregated, current) => {
        var matchingSongs = current.songs.filter(song =>
            searchTerms.every(term =>
                (song.artist + song.title).toLowerCase().includes(term.toLowerCase())
            ))
        if (matchingSongs.length > 0) {
            aggregated.push({ ...current, songs: matchingSongs })
        }
        else if (searchTerms.every(term => current.labelName.toLowerCase().includes(term.toLowerCase()))) {
            aggregated.push(current)
        }
        return aggregated;

    }, [] as ILabelDTO[]);
}

const sortByLabelName = (list: ILabelDTO[], descending: boolean) =>
    list.sort((first, second) => {
        if (first.labelName > second.labelName) return descending ? -1 : 1;
        else if (first.labelName < second.labelName) return descending ? 1 : -1;
        return 0;
    })


export default { constants: { labelPath }, helpers: {findLabelByName, createFilteredSet, sortByLabelName } }