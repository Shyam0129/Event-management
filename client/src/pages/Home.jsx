import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, TorusKnot } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaCheckCircle, FaCalendarCheck, FaBolt, FaUsers, FaLock, FaTicketAlt } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const WavePlane = () => {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (planeRef.current) {
      const positions = planeRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] = Math.sin(time + i * 0.02) * 0.2; // Wave effect
      }

      planeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

const AnimatedTorusKnot = () => {
  const torusRef = useRef();

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.y = clock.getElapsedTime();
    }
  });

  return (
    <TorusKnot ref={torusRef} args={[1, 0.3, 128, 32]} position={[0, 1, 0]}>
      <meshStandardMaterial color="purple" wireframe />
    </TorusKnot>
  );
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col items-center">
      {/* 🌍 Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }} // Parallax effect
        >
          Smart Event Booking
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl text-lg">
          Seamlessly book and manage event registrations with our AI-powered system.
        </p>

        {/* 3D Animated Elements */}
        <Canvas className="absolute inset-0">
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color="#4F46E5" attach="material" distort={0.6} speed={2} />
          </Sphere>
          <AnimatedTorusKnot />
          <WavePlane />
        </Canvas>

        <Link
          to="/events"
          className="relative z-10 mt-8 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300"
        >
          Explore Events 🚀
        </Link>
      </div>

      {/* 🎯 Features Section */}
      <div className="mt-20 px-6 w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-blue-400">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
          {[
            { icon: <FaLock />, title: "Secure Bookings", desc: "Fast and reliable QR-based event check-ins." },
            { icon: <FaCalendarCheck />, title: "Easy Management", desc: "Track your bookings effortlessly." },
            { icon: <FaBolt />, title: "Real-time Updates", desc: "Get instant event status notifications." },
            { icon: <FaUsers />, title: "Community Driven", desc: "Join a thriving event community." },
            { icon: <FaTicketAlt />, title: "Exclusive Access", desc: "Special tickets for premium members." },
            { icon: <FaCheckCircle />, title: "Verified Events", desc: "No fake events, only authentic ones." },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-900 bg-opacity-30 backdrop-blur-xl rounded-lg shadow-lg border border-gray-700 hover:scale-105 transition-transform flex items-center space-x-4"
            >
              <div className="text-4xl text-blue-400">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🏆 Featured Events */}
      <div className="mt-24 px-6 w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-purple-400">Featured Events</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mt-10"
        >
          {[
  {
    img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    title: "Tech Conference 2025",
    date: "June 15, 2025",
  },
  {
    img: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg",
    title: "Music Fest 2025",
    date: "July 10, 2025",
  },
  {
    img: "https://images.pexels.com/photos/3183148/pexels-photo-3183148.jpeg",
    title: "Startup Summit 2025",
    date: "August 5, 2025",
  },
  {
    img: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg",
    title: "Art & Creativity Expo",
    date: "September 20, 2025",
  },
  {
    img: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    title: "Business Networking Event",
    date: "October 12, 2025",
  },
 
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyURRDlzb6gEnrVlJOKHhGYUkkyIz0A7l4HOBp2VPeadiBpOvIT-157pTZzgp6kIH8iJA&usqp=CAU",
    title: "AI & Robotics Symposium",
    date: "December 15, 2025",
  },
].map((event, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-96 w-full flex flex-col items-center justify-center text-center shadow-xl rounded-lg overflow-hidden">
                <img
                  src={event.img}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-80 transition-transform transform hover:scale-105"
                />
                <div className="relative z-10 bg-black bg-opacity-50 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <p className="text-gray-300">{event.date}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🙌 Testimonials (Dark Mode Cards) */}
      <div className="mt-24 mb-8 px-6 w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-green-400">What Our Users Say</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mt-10"
        >
          {[
            { name: "Alice Johnson", review: "This platform made event booking so seamless!", img: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "Michael Lee", review: "The QR check-in feature is a game changer!", img: "https://randomuser.me/api/portraits/men/2.jpg" },
            { name: "Sophia Kim", review: "I love how easy it is to track my events.", img: "https://randomuser.me/api/portraits/women/3.jpg" },
          ].map((user, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center p-6 bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg border border-gray-700">
                <img src={user.img} alt={user.name} className="w-24 h-24 rounded-full border-4 border-green-400" />
                <h3 className="mt-4 text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-300 mt-2">{user.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
