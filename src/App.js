import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import iconNext from './images/icon-next.svg'
import iconPrev from './images/icon-prev.svg'
import Items from './Items'
import './App.scss';




function App() {

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [update, setUpdate] = useState(false);

  const imageIndex = wrap(0, Items.length, page);

  const handlePage = newDirection => {
      setDirection(newDirection)
      setUpdate(!update)
  }


  const handleKey = e => {
    if (e.keyCode === 37) {
      handlePage(-1)
    } else if (e.keyCode === 39) {
      handlePage(1)
    }
  }

  useEffect(()=> {
    setPage(p => p + direction)
  }, [direction, update])

  return (
      
      <div className='container'>
      <div className='testimonial' onKeyDown={handleKey} tabIndex="0">

          <div 
          className='text-wrapper' 
          >
            <div className='text'>
            <motion.span
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{opacity: { duration: 1 }}}
              key={page}
            >
              {Items[imageIndex].text}
            </motion.span>
            </div>
            <motion.div 
              className='info'
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{opacity: { duration: 1 }}}
              key={page}
            >
              <div className='source'>{Items[imageIndex].source}</div>
              <div className='role'>{Items[imageIndex].role}</div>
            </motion.div>
          </div>

  
        <div className='image-wrapper'>
          <div className='controls'> 
            <span onClick={() => handlePage(-1)} className='control prev'><img src={iconPrev} alt='Prev button' /></span>
            <span onClick={() => handlePage(1)} className='control next'><img src={iconNext} alt='Next button' /></span>
          </div>
          <div className='image'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.img 
                key={page}
                custom={direction}
                src={Items[imageIndex].image} 
                alt={Items[imageIndex].source} 
                initial={{x: direction > 0 ? 300 : -300, opacity: 0}}
                exit={{zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0}}
                animate={{zIndex: 1, x: 0, opacity: 1}}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 200 },
                  opacity: { duration: 0.2 }
                }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      </div>
  );

}

export default App;
