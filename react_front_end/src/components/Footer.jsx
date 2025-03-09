import "../style/Footer.css"; 

const Footer = () => {
    return (
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} <strong>HelpingHand.</strong> All Rights Reserved.</p>
      </footer>
    );
};

export default Footer;
