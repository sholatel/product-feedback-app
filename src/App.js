import {Route, Routes, useLocation} from 'react-router-dom'
import {React, useEffect, useState,createContext,lazy,Suspense} from 'react'
import {DashBoard} from './components/DashBoard'
import axios  from 'axios';
import { AnimatePresence } from 'framer-motion';
const  FeedbackDetails = lazy(()=> import('./components/FeedbackDetails ')) ;
const  NewFeedback = lazy(()=> import('./components/NewFeedback'));
const  RoadmapPage= lazy(()=> import('./components/RoadmapPage'));
const RoadmapList= lazy(()=> import('./components/RoadmapList'));
const   EditFeedback = lazy(()=>  import('./components/EditFeedback'));
export const DataContext = createContext('') 

function App() {
  const [jsonData, setJsonData] =useState('') //state for holding the json data  fetched  
  const [load, setLoading]=useState(true)
  const location=useLocation()
  const  loader= document.getElementById('loader') //loading animation before displaying content
  
  //end animation after 3s 
  if (loader) {
    setTimeout(()=> {
      loader.style.display='none'
      setLoading(false)
    },3000)
  }

  useEffect(()=> {
    const fetchData = async ()=> {
    try {
      const {data}= await axios.get('/data.json')
      //stringify in order to be able to stop reredering when state doesn't change
       setJsonData(JSON.stringify(data))  
    }
    
    catch (err) {
      console.log(err.message)
    }
  }
  fetchData()

  },[])

//routes transition animation variants
const variants= {
  hidden: {
      opacity:0,
      x:'100vw'
  },
  visible: {
      opacity:1,
      x:0,
      transition: {
          duration:0.7,
          delay:0.1,
          delayChildren:0.1,
          
      }
  },
  exit:{
      x:'-100vw',
      transition: {
          ease:'easeInOut'
      }
  }
}

  return (
   !load && <div className="App w-full h-full bg-appBg"> 
      {jsonData ?
       <DataContext.Provider value={[jsonData,setJsonData]}> 
       <AnimatePresence>
        <Suspense fallback={<div id="loader" class="grid items-center justify-center w-full h-full">
      <img class="w-25 h-25" src='/loader.gif'/>
    </div>}>
        <Routes location={location} key={location.pathname} exitBeforeEnter> 
          <Route  index path='/' element={<DashBoard variants={variants}/>}/>
          <Route path='/feedback/:id' element={<FeedbackDetails  variants={variants}/>}/>
          <Route path='/new_feedback' element={<NewFeedback variants={variants}/>}/>
          <Route path='/edit_feedback/:id' element={<EditFeedback variants={variants}/>}/>
          <Route path='/roadmap' element={<RoadmapPage/>}>
              <Route index element={<RoadmapList listName='in-progress' />}/>
              <Route path='planned' element={<RoadmapList listName='planned'/>}/>
              <Route path='in-progress' element={<RoadmapList listName='in-progress'/>}/>
              <Route path='live' element={<RoadmapList listName='live'/>}/>
          </Route>
        </Routes>
        </Suspense>
        </AnimatePresence> 
      </DataContext.Provider> : null
      }
    </div>
  );
}

export default App;
