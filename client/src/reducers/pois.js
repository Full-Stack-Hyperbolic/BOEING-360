
const pois = (pois = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        default:
            return pois;
    }
}

export default pois;