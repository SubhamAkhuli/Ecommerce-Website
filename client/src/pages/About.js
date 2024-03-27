import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

function About() {
  return (
    <div>
      <Header />
      <div  style={{ minHeight: "67.5vh" }}>
        <h1 className="text-center" >About Us</h1>
        <div class="container" style={{maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px"}}>
        <h2 className="text-center">Welcome to Your Ecommerce Website</h2>
        <p className='text-justify'>At Your Ecommerce Website, we believe in bringing you a seamless online shopping experience tailored to your needs. Whether you're seeking the latest fashion trends, innovative gadgets, or everyday essentials, we've curated a diverse selection of products just for you. With a commitment to quality, convenience, and customer satisfaction, we strive to be your go-to destination for all your shopping needs.</p>
        <h2>Our Story</h2>
        <p className='text-justify'>Founded in 2024, Your Ecommerce Website started with a simple vision: to revolutionize the way people shop online. What began as a passion project has since grown into a thriving platform, serving customers across the globe. Our journey has been fueled by a dedication to innovation, a relentless pursuit of excellence, and most importantly, a deep appreciation for our customers.</p>
        <h2>What We Offer</h2>
        <p className='text-justify'>Discover an extensive range of products across various categories, including:</p>
        <ul>
            <li>Fashion & Apparel</li>
            <li>Electronics & Gadgets</li>
            <li>Home & Living</li>
            <li>Health & Beauty</li>
            <li>Sports & Outdoors</li>
        </ul>
        <h2>Why Choose Us?</h2>
        <ol>
            <li>Quality Assurance</li>
            <li>Convenience</li>
            <li>Customer Support</li>
            <li>Value for Money</li>
            <li>Community</li>
        </ol>
        <h2>Get in Touch</h2>
        <p className='text-justify'>Have a question or feedback? We'd love to hear from you! Feel free to reach out to our customer support team via email, phone, or live chat. Stay connected with us on social media for the latest updates, promotions, and exclusive offers.</p>
    </div>
      </div>
      <Footer />
    </div>
  );
}

export default About
