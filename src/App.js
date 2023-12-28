import Button from 'react-bootstrap/Button'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Nav, NavItem } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
// LinkContainer allows boostrap components such as 'Button' and 'Navbar' to behave like react router
import { LinkContainer } from 'react-router-bootstrap'
import NoPage from './pages/NoPage'
import { Link } from 'react-router-dom'


import MyNavbar from './components/MyNavbar'
import ROIPage from './pages/ROIPage'
import NetWorthPage from './pages/NetWorthPage'
import InvestmentPage from './pages/InvestmentPage'
import HomeBuyingPage from './pages/HomeBuyingPage'
import TakeHomePayPage from './pages/TakeHomePayPage'


function Sidebar() {
  return (
    <div className='sidebar d-none d-md-block'>
      <h2>Go to: </h2>
      <Nav className='flex-column'>
        <NavItem>
          <Link to="/" className="nav-link">All Calculators</Link>
        </NavItem>
        <NavItem>
          <Link to="/net-worth-calculator" className="nav-link">Net Worth Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/investment-calculator" className="nav-link">Investment Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/home-buying-calculator" className="nav-link">Home Buying Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/take-home-pay-calculator" className="nav-link">Take Home Pay Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/roi-calculator" className="nav-link">Return on Investment Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/car-cost-calculator" className="nav-link">Compare Car Lease vs Finance Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/affordability-calculator" className="nav-link">Affordability Calculator</Link>
        </NavItem>
        {/* repeat for other links */}
      </Nav>
    </div>
  )
}


function CalcCard({ title, text, imageUrl, route }) {
  return (
    <Card className='calc-card text-center'>
      <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Img variant="top" src={imageUrl} />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <LinkContainer to={route}>
            <Button variant="primary">Try it</Button>
          </LinkContainer>
        </Card.Body>
      </Link>
    </Card>
  );
}

function CardCollection() {
  const cardData = [
    {
      id: 1,
      title: "Net Worth Calculator",
      text: "Discover your financial standing by calculating your net worth. Evaluate all your assets against liabilities to understand where you stand financially.",
      imageUrl: "https://www.investopedia.com/thmb/DpJUmwpHd79ubs8mL3jdGEMehBM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/net-worth-4192297-1-6e76a5b895f04fa5b6c10b75ed3d576f.jpg",
      route: "/net-worth-calculator"
    },
    {
      id: 2,
      title: "Investment Calculator",
      text: "Explore your investment potential. See how your money could grow in different scenarios like stocks, high-yield savings, or cryptocurrency over time.",
      imageUrl: "https://ssir.org/images/blog/Lamy-Leijonhufvud-ODonohoe-next-decade-impact-invest-592x444.jpg",
      route: "/investment-calculator"
    },
    {
      id: 3,
      title: "Home Buying Planner",
      text: "Determine how long it will take to buy your dream home based on your income. Calculate your potential future mortgage payments.",
      imageUrl: "https://www.bankrate.com/2023/05/11164344/Real-Estate-When-should-I-buy-a-house-Personal-vs-Market.jpg?auto=webp&optimize=high&crop=16:9&width=912",
      route: "/home-buying-calculator"
    },
    {
      id: 9,
      title: "Student Loan Repayment Calculator",
      text: "Manage your student loan repayment effectively. Input your loan details to see your monthly payment and total interest.",
      imageUrl: "https://cdn.vox-cdn.com/thumbor/BdZesQyvmI96OWiRPSK0jK5ipu0=/0x0:7095x5000/1200x800/filters:focal(2889x1608:4023x2742)/cdn.vox-cdn.com/uploads/chorus_image/image/72727061/GettyImages_1482844574.0.jpg",
      route: "/no-page"
    },
    
    {
      id: 5,
      title: "Calculate my salary after taxes",
      text: "Discover your actual take-home pay. Enter your salary details to see the impact of state taxes and tax brackets on your paycheck.",
      imageUrl: "https://media.istockphoto.com/id/1481366238/vector/taxation-concept-calculation-of-the-tax-return-paperwork-tax-payment-date-flat-vector.jpg?s=612x612&w=0&k=20&c=U27cKNe_xrTOuNZLBBeHCZuK0d9IpU3VZEsAve8-Ajw=",
      route: "/no-page"
    },
    {
      id: 6,
      title: "How long until I can afford to buy this outright",
      text: "Set a savings goal and calculate when you can achieve it. Find out the time needed to afford it based on income and savings rate.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_Q7X0KufUWLjs_9oZdY76S2WcX3O9hTvhg&usqp=CAU",
      route: "/no-page"
    },
    {
      id: 4,
      title: "Lease vs Finance Car",
      text: "Deciding between car leasing and financing? Use this tool to compare options based on your down payment, monthly payments, and loan term.",
      imageUrl: "https://media.ed.edmunds-media.com/lexus/rx/2024/oem/2024_lexus_rx_4dr-suv_350-f-sport_fq_oem_1_1600.jpg",
      route: "/no-page"
    },
    {
      id: 7,
      title: "Can I afford this house?",
      text: "Estimate the mortgage amount you can afford based on your income, debts, and down payment. Make informed decisions about your home purchase.",
      imageUrl: "https://truenorthmortgage.imgix.net/images/Affordability.png?auto=format&crop=focalpoint&domain=truenorthmortgage.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=630&ixlib=php-3.3.1&q=82&usm=20&w=1200",
      route: "/no-page"
    },
    {
      id: 8,
      title: "Rent vs. Buy Calculator",
      text: "Compare the costs of renting versus buying a property over time. Consider rent, home prices, taxes, and other factors to make an informed decision.",
      imageUrl: "https://www.realestaterph.com/wp-content/uploads/2020/06/Renting-Vs-Buying.png",
      route: "/no-page"
    },
    {
      id: 10,
      title: "Retirement Savings Planner",
      text: "Plan for a comfortable retirement. Calculate how much you need to save based on your retirement goals and current financial situation.",
      imageUrl: "https://www.investopedia.com/thmb/6Fs58qtVnu8FlWYTBtMA6lKp3r0=/2200x1500/filters:no_upscale():max_bytes(150000):strip_icc()/retirement_v1_0711-c8b08cb7dce649a085b940ff3926e794.png",
      route: "/no-page"
    },
    {
      id: 11,
      title: "Return on Investment Tool",
      text: "Evaluate the effectiveness of your investments. Input initial amount, total returns, and duration to calculate your return on investment.",
      imageUrl: "https://www.salesbook.com/wp-content/uploads/2023/04/what_is_ROI-1024x706.png",
      route: "/roi-calculator"
    },


  ]
  return (
    <Container fluid className='card-collection-container'>
      <Row>
        {/* make a card for each entry in the array */}
        {cardData.map(card => (
          <Col key={card.id} md={4} className="mb-4">
            <CalcCard
              title={card.title}
              text={card.text}
              imageUrl={card.imageUrl}
              route={card.route}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

function App() {

  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Container fluid className='mt-4'>
          {/* <Container fluid> */}
          <Row>
            <Col xs={2}>
              <Sidebar />
            </Col>
            <Col md={{ span: 10 }}>

              {/* load diffrent page based on the route */}
              <Routes>
                <Route path="/" element={<CardCollection />} />
                <Route path="/no-page" element={<NoPage />} />
                <Route path="/roi-calculator" element={<ROIPage />} />
                <Route path="/investment-calculator" element={<InvestmentPage />} />
                <Route path="/net-worth-calculator" element={<NetWorthPage />} />
                <Route path="/home-buying-calculator" element={<HomeBuyingPage />} />
                <Route path="/take-home-pay-calculator" element={<TakeHomePayPage />} />
                {/* more routes */}
                
              </Routes>
            </Col>
          </Row>
        </Container>

      </div>
    </Router>
  );
}

export default App;
