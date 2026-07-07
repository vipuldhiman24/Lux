import { motion } from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (

    <section className="hero-section">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <p className="hero-tag">
          PREMIUM DIGITAL 
        </p>

        <h1>
          Buy Things <br />
          Myabe <br />
          
        </h1>

        <p className="hero-subtext">

          Using Adobe Target 

        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => {

              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });

            }}
          >
            Shop Now
          </button>

          <button
            className="secondary-btn"
            onClick={() => {

              const randomId =
                Math.floor(Math.random() * 30) + 1;

              navigate(`/product/${randomId}`);

            }}
          >
            Random Item ?
          </button>

        </div>

      </motion.div>

    </section>
  );
}