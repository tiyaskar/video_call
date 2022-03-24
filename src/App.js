import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './App.css';
import './style.css'

function App() {
  const [currentCall, setCurrentCall] = useState("");
  const [s, setS] = useState(null)
  const [c, setc] = useState(null)
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [disp, setDisp] = useState(false);
  // const [disp1, setDisp1] = useState('none');
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const idx = 12345
  useEffect(() => {
    const peer = new Peer(undefined,
      // {
      //   host: '3.109.209.143',
      //   port: 9000,
      //   path: '/videocallapp'
      // }
      {
        host: 'localhost',
        port: 9000,
        path: '/'
      }
    );
    peer.on('open', (id) => {
      setPeerId(id)
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      setDisp(true)
      getUserMedia({ video: true, audio: false }, (mediaStream) => {
        setS(mediaStream)
        // mediaStream.getAudioTracks()[0].enabled = a;
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
      });
    });

    peer.on('call', (call) => {
      // const answerCall = window.confirm("Do you want to answer?")
      // if(answerCall){
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      setDisp(false)
      // setDisp1('block')
      setCurrentCall(call)
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        setS(mediaStream)
        currentUserVideoRef.current.srcObject = mediaStream;
        // mediaStream.getAudioTracks()[0].enabled = false;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
        // call.on('close', () => {
        //   endCall()
        // })
      })
      // }else{
      //   window.alert("call denied");
      //   setDisp(true)
      // }
       
      //   c.on('close', function (){
      //     setDisp(true)
      // })

    })
    console.log(a)
    peerInstance.current = peer;
  }, [])

  const call = (remotePeerId) => {
    var conn = peerInstance.current.connect(remotePeerId);
    setc(conn)
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    setDisp(false)
    // setDisp1('block')
    // console.log(disp," ", disp1)

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      // mediaStream.getAudioTracks()[0].enabled = false;
      setS(mediaStream)
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      const call = peerInstance.current.call(remotePeerId, mediaStream)
      setCurrentCall(call)
      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
      // call.close();
    });
  }
  const audioMute = () => {
    setA(!a)
    s.getAudioTracks()[0].enabled = a;
    // a ? setA(false) : setA(true);
    console.log(a)

  }
  const videoOff = () => {
    setB(!b)
    s.getVideoTracks()[0].enabled = b;
  }
  const endCall = () => {
    //   // Go back to the menu
    //   // document.querySelector("#menu").style.display = "block";
    //   // document.querySelector("#live").style.display = "none";
    //   setDisp(true)
    // // If there is no current call, return
    //   if (!currentCall) return;
    // // Close the call, and reset the function
    //   try {
    //     currentCall.close();
    //   } catch {}
    //   currentCall = "";
  }
  return (
    <div className="container-fluid">
      <h4 style={{ paddingTop: "20px" }}>Current user id is {peerId}</h4>
      <div className="container">

        {/* <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} /> */}
        {/* <button onClick={() => call(remotePeerIdValue)}>Call</button> */}
        {/* <button onClick={ax}>Video</button> */}
        {/* <div className="container"> */}
        {disp ?
          // <div className="main__videos" style={{ flexGrow: 1, backgroundColor: 'black', display: disp, justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          //   <div id="video-grid" style={{ display: 'flex', justifyContent: 'center' }}>
          //     <video ref={currentUserVideoRef} />
          //   </div>
          // </div>
          <>
          <div className="row">
            <div className="col-sm-12">
              <center>
              <video ref={currentUserVideoRef} style={{paddingTop: '30px',paddingBottom: '30px'}}/>
              </center>
            </div>
          </div>
          {/* <div className="main__controls">
          <div className="main__controls__block">
            <div onClick={audioMute} className="main__controls__button main__mute_button">
              <i className="fas fa-microphone"></i>
              <span>Mute</span>
            </div>
            <div onClick={videoOff} className="main__controls__button main__video_button" >
              <i className="fas fa-video"></i>
              <span>Stop Video</span>
            </div>
          </div>
          <div className="main__controls__block">
            <div className="main__controls__button " >
              <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            </div>
            <div className="main__controls__button" onClick={() => call(remotePeerIdValue)}>
              <i className="fas fa-user-friends"></i>
              <span>Call</span>
            </div>
          </div>
          <div class="main__controls__block" onClick={endCall}>
            <div class="main__controls__button">
              <span class="leave_meeting">Leave Meeting</span>
            </div>
          </div>
        </div> */}
        </>
          :
          <div className="row">
            <div className="col-sm-2">
              {/* <h3>{peerId}</h3> */}
              <video ref={currentUserVideoRef} muted="muted" width="300px" height="300px" style={{margin: "16px", border:" 2px solid #fff"}}/>
            </div>
            <div className="col-sm-10">
              {/* <h3>{remotePeerIdValue}</h3> */}
              <center><video ref={remoteVideoRef} style={{width: 'inherit', height: '540px'}}/></center>
            </div>
          </div>
        //   <div id="live">
        //     <video id="remote-video" ref={remoteVideoRef}></video>
        //     <video id="local-video" ref={currentUserVideoRef} muted="true"></video>
        //     <button id="mute-call">Mute Call</button>
        //     <button id="stop-video">Stop Video</button>
        //     <button id="end-call">End Call</button>
        // </div>
          }
        {/* </div> */}
      </div>
      {/* <div>
        <center><button onClick={audioMute} style={{border: '1 px solid white', borderRadius: "50%"}}>{a?'true':'False'}</button><button onClick={videoOff}>Stop Video</button></center>
      </div> */}
       {/* <div style={{position: 'absolute', button: 0, left: 0, width: '100%'}}> */}
       <div className="main__controls">
        <div className="main__controls__block">
          <div onClick={audioMute} className="main__controls__button main__mute_button">
            <i className="fas fa-microphone"></i>
            <span>Mute</span>
          </div>
          <div onClick={videoOff} className="main__controls__button main__video_button" >
            <i className="fas fa-video"></i>
            <span>Stop Video</span>
          </div>
        </div>
        <div className="main__controls__block">
          <div className="main__controls__button " >
            <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} style={{width: '400px'}}/>
          </div>
          <div className="main__controls__button" onClick={() => call(remotePeerIdValue)}>
            <i className="fas fa-phone"></i>
            <span>Call</span>
          </div>
        </div>
        <div class="main__controls__block" onClick={endCall}>
          <div class="main__controls__button">
            <span class="leave_meeting">Leave Meeting</span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>

  );
}

export default App;
