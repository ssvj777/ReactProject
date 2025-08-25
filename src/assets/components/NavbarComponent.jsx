import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './Child';
import { useContext } from 'react';
import { MdShoppingCart } from 'react-icons/md';

function NavbarComponent() {
  let {userData} = useContext(userContext)

  let navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid className='navbarComponent'> 
        <Navbar.Brand href="#" className='navbarContent' style={{fontSize:"28px", color:"blue"}}>Shoppieee...</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/'>   ProductsList   </Nav.Link>
            <NavDropdown id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/product/CreateNewProduct">
                Create NewProduct
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/product/productCount">Products Count</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to='/todoList'>Todo-List</Nav.Link>
            <Nav.Link as={Link} to="/signUp" >
              Sign-Up
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="warning" onClick={()=>{navigate("/product/wishlist")}} style={{marginRight:"7px"}}> <MdShoppingCart /></Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            <h2 className='profile'> {userData.slice(0,1)}</h2>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;