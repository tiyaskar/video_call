import firebase from './firebase';
// import { collection, query, where, getDocs } from "firebase/firestore";
const auth = firebase.auth();
const db = firebase.firestore();
// const query = firebase.query();
// const getDocs = firebase.getDocs();
// import { query, collection, where, getDocs } from "firebase/firestore";


const getAuthenticateUser = () => {
    // auth.onAuthStateChanged().then((signuser)=>{
    //     console.log('sign in user==>', signuser);
    //     return user;
    // }).catch((e)=>{
    //     return false;
    // });

    auth.onAuthStateChanged(function (user) {
        if (user) {
            // var user = auth.currentUser;
            console.log('sign in user==>', user.uid);
            return user;
        } else {
            console.log('session expired');
            return false;
        }
    });
}
// const spval= async (worker_name)=>{
//     const q = db.query(db.collection(db, "workers"), db.where("name", "==", worker_name));
//     const querySnapshot = await db.getDocs(q);
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       return (doc.id);
//     });
// }
const getAllCollection = async () => {
    const snapshot = await db.collection('frienduser').get();
    console.log('snapshot==>', snapshot);
    return snapshot.docs.map(doc => {
        let rObj = {}
        rObj.id = doc.id;
        rObj = { ...rObj,...doc.data()};
        return rObj
    });
}
const getAllParts = async () => {
    const snapshot = await db.collection('qr_part').get();
    console.log('snapshot==>', snapshot);
    return snapshot.docs.map(doc => {
        let rObj = {}
        rObj.id = doc.id;
        rObj = { ...rObj,...doc.data()};
        return rObj
    });
}
 const getAllUsers = async () => {
    const snapshotUsers = await db.collection('users').get();
    console.log('snapshotUsers==>', snapshotUsers);
    return snapshotUsers.docs.map(doc => {
        let rObj = {}
        rObj.id = doc.id;
        rObj = { ...rObj,...doc.data()};
        return rObj
    });
 }

 const getAllPending = async () => {
    const snapshotUsers = await db.collection('pending').get();
    console.log('snapshotUsers==>', snapshotUsers);
    return snapshotUsers.docs.map(doc => {
        let rObj = {}
        rObj.id = doc.id;
        rObj = { ...rObj,...doc.data()};
        return rObj
    });
 }
 const getAllWorkers = async () => {
    const snapshotUsers = await db.collection('workers').get();
    console.log('snapshotUsers==>', snapshotUsers);
    return snapshotUsers.docs.map(doc => {
        let rObj = {}
        rObj.id = doc.id;
        rObj = { ...rObj,...doc.data()};
        return rObj
    });
 }

const getCollection = async (itemId) => {
    console.log('service.itemId==>',itemId);
    const snapshot = await db.collection('items_list').doc(itemId).get();
    console.log('snapshot==>', snapshot.data());
    return snapshot.data();
}
const getPart = async (itemId) => {
    console.log('service.itemId==>',itemId);
    const snapshot = await db.collection('qr_part').doc(itemId).get();
    console.log('snapshot==>', snapshot.data());
    return snapshot.data();
}

const getCollectionUsers = async (userId) => {
    console.log('service.userId==>',userId);
    const snapshot = await db.collection('users').doc(userId).get();
    console.log('snapshotUserData==>', snapshot.data());
    return snapshot.data();
}
const getPendingUsers = async (pId) => {
    console.log('service.pId==>',pId);
    const snapshot = await db.collection('pending').doc(pId).get();
    console.log('snapshotUserData==>', snapshot.data());
    return snapshot.data();
}

const getAll = () => {
    return db;
};

const create = (data) => {
    return db.push(data);
};

const update = (key, data) => {
    return db.child(key).update(data);
};

const remove = (key) => {
    return db.child(key).remove();
};

const removeAll = () => {
    return db.remove();
};

export default {
    getAll,
    create,
    update,
    remove,
    removeAll, getAuthenticateUser, getAllCollection, getCollection,getCollectionUsers,getAllUsers,
    getAllPending,getPendingUsers,getAllWorkers,getAllParts,getPart
    // spval,
};
