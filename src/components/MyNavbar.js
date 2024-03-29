import { Container } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BrandImage from '../Assets/stocks.png'
import { Link } from 'react-router-dom';

// using CSS Module to modify nav items for this file scope only
import MyNavbarCSS from './MyNavbar.module.css'

function MyNavbar({ pageTitle }) {
    return (
      <Navbar expand="lg" className={MyNavbarCSS.nav}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={BrandImage}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </LinkContainer>
        
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Display page title for smaller screens */}
        <span className={MyNavbarCSS.pageTitle}>{pageTitle}</span>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {/* other links add here and wrap it with a link container*/}
              <LinkContainer to="/my-finances">
                <Nav.Link>Track my Journey</Nav.Link>
                </LinkContainer>
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/newsletter">
                <Nav.Link>Newsletter</Nav.Link>
              </LinkContainer>
              
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <LinkContainer to="action3.1">
                  <NavDropdown.Item>Community</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/action/3.2">
                  <NavDropdown.Item>Contact</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to="/action/3.3">
                  <NavDropdown.Item>Help / Support</NavDropdown.Item>
                </LinkContainer>
                 <NavDropdown.Divider />
                <LinkContainer to="/action3.4">
                  <NavDropdown.Item>
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/action3.5">
                  <NavDropdown.Item>
                    Settings
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  export default MyNavbar;