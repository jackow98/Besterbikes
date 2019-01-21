import * as firebase from "firebase";

export const makeReservations = async ({startDate,startTime, station, mountainBikes, regularBikes}) => {

    const numberOfAvailableBikes = getNumberOfAvailableBikes(station,"road");

    //TODO check regular and mountain bikes are valid
    if (numberOfAvailableBikes > regularBikes) {

        const db = firebase.firestore();

        const auth = firebase.auth();
        const uid = auth.currentUser.uid;

        const reservationsCollection = db.collection('reservations');

        const reservationDocument = {
            start: {
                time: {
                    date: startDate,
                    time: startTime
                },
                station: station
            },
            user: uid
        };

        const promise = getNestedPromise({promiseFunction : makeSingleReservation(reservationsCollection,reservationDocument),counter : 0, max : regularBikes});

        return promise.then (() => {
            const newNumberOfAvailableBikes = numberOfAvailableBikes - regularBikes;
            return setNumberOfAvailableBikes(station,newNumberOfAvailableBikes,"road");
        })
        .then(() => {
            return "success"
        })
        .catch(err => {
            return err
        });

    }

    throw new Error("Not enough bikes available at selected station");

};


export const getNumberOfAvailableBikes = async (station,bikeType) =>
{
    const db = firebase.firestore();

    const stationsCollection = db.collection('stations');
    const thisStationDocument = stationsCollection.doc(station);


    return thisStationDocument.get()
        .then (doc => {

            const thisStationData = doc.data();


            console.log("thisStationData:");
            console.log(thisStationData);


            const bikes = thisStationData['bikes'][bikeType];
            const numberOfAvailableBikes = bikes['numberOfAvailableBikes'];

            console.log("Number of available bikes is " + numberOfAvailableBikes);

            return numberOfAvailableBikes;

        })
        .catch(err => {return err});

};

export const setNumberOfAvailableBikes = async (station,numberOfAvailableBikes,bikeType) => {

    const db = firebase.firestore();

    const stationsCollection = db.collection('stations');
    const thisStationDocument = stationsCollection.doc(station);

    let bikesObject = {};
    bikesObject["bikes"][bikeType] = {numberOfAvailableBikes : numberOfAvailableBikes};

    const promise = thisStationDocument.update(bikesObject);

    return promise
        .then(() => {return "success"})
        .catch(err => {return err});

};

export const appendUserReservationsArray = async (reservationReference) =>
{
    const auth = firebase.auth();
    const uid = auth.currentUser.uid;

    const db = firebase.firestore();

    const usersCollection = db.collection('users');
    const currentUserDocument = usersCollection.doc(uid);

    return currentUserDocument.get()
        .then (doc => {

            const currentUserData = doc.data();

            let reservationsArray = currentUserData['reservationsArray'];

            if (reservationsArray)
            {
                reservationsArray.push(reservationReference);
            } else {
                reservationsArray = [reservationReference];
            }

            console.log(reservationsArray);

            const promise = currentUserDocument.update({reservationsArray : reservationsArray});

            return promise
                .then(() => {return "success"})
                .catch(err => {return err});
        })
        .catch(err => {return err});

};

export const makeSingleReservation = async (reservationsCollection,reservationDocument) => {

    const addPromise = reservationsCollection.add(reservationDocument);

    addPromise
        .then(ref => {
            console.log("Single Reservation Added!")

            const appendPromise = appendUserReservationsArray(ref.id);

            return appendPromise
                .then(() => {return "success"})
                .catch(err => {return err});
        })
        .catch(err => {return err});

};

export const getNestedPromise = async ({promiseFunction,counter,max}) =>
{
    counter++;
    if (counter<=max)
    {
        return promiseFunction
            .then(() => {return getNestedPromise({promiseFunction,counter,max})})
            .catch(err => {return err});
    }


};