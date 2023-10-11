import { motion } from 'framer-motion';
import './Error404.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Error404() {
  useEffect(() => {
    document.title = '404 Page';
  }, []);

  return (
    <div>
      <motion.div
        className="box"
        animate={{
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <div className="container-404">
        <div className="text-404">404 Error</div>
        <div className="back-404">
          <Link to={'/'}>Back to Main</Link>
        </div>
      </div>
    </div>
  );
}
