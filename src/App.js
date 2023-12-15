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
          <Link to="/roi-calculator" className="nav-link">Return on Investment Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/car-cost-calculator" className="nav-link">Compare Car Lease vs Finance Calculator</Link>
        </NavItem>
        <NavItem>
          <Link to="/affordability-calculator" className="nav-link">How long to afford this?</Link>
        </NavItem>
        <NavItem>
          <Link to="/car-cost-calculator" className="nav-link">Salary after Taxes Calculator</Link>
        </NavItem>
        {/* repeat for other links */}
      </Nav>
    </div>
  )
}


function CalcCard({ title, text, imageUrl, route }) {
  return (
    <Card className='calc-card text-center'>
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
    </Card>
  );
}

function CardCollection() {
  const cardData = [
    {
      id: 1,
      title: "Net Worth Calculator",
      text: "Discover your financial standing! Calculate your net worth by evaluating all your assets against liabilities. Understand where you stand financially and plan your future accordingly.",
      imageUrl: "https://www.investopedia.com/thmb/DpJUmwpHd79ubs8mL3jdGEMehBM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/net-worth-4192297-1-6e76a5b895f04fa5b6c10b75ed3d576f.jpg",
      route: "/net-worth-calculator"
    },
    {
      id: 2,
      title: "Investment Calculator",
      text: "Explore the potential of your investments! Compare the growth of your money in different scenarios like stocks, high-yield savings, or cryptocurrency over various timeframes.",
      imageUrl: "https://ssir.org/images/blog/Lamy-Leijonhufvud-ODonohoe-next-decade-impact-invest-592x444.jpg",
      route: "/roi-calculator"
    },
    {
      id: 3,
      title: "Return on Investment Analysis Tool",
      text: "calculate your return on investment by inputting the initial amount, total returns, and the investment duration. This powerful tool helps you to evaluate the effectiveness of your investments.",
      imageUrl: "https://www.salesbook.com/wp-content/uploads/2023/04/what_is_ROI-1024x706.png",
      route: "/roi-calculator"
    },
    {
      id: 4,
      title: "Should I lease or Finance a Car",
      text: "Making a decision on car financing? This tool helps you compare leasing vs. financing options based on your down payment, monthly payments, and the term of the loan.",
      imageUrl: "https://media.ed.edmunds-media.com/lexus/rx/2024/oem/2024_lexus_rx_4dr-suv_350-f-sport_fq_oem_1_1600.jpg",
      route: "/no-page"
    },
    {
      id: 5,
      title: "Calculate my salary after taxes",
      text: "Find out your actual take-home pay! Enter your salary details to see how state taxes and different tax brackets affect your paycheck, giving you a clear picture of your net income.",
      imageUrl: "https://media.istockphoto.com/id/1481366238/vector/taxation-concept-calculation-of-the-tax-return-paperwork-tax-payment-date-flat-vector.jpg?s=612x612&w=0&k=20&c=U27cKNe_xrTOuNZLBBeHCZuK0d9IpU3VZEsAve8-Ajw=",
      route: "/no-page"
    },
    {
      id: 6,
      title: "How long until I can afford this",
      text: "Set your savings goal and find out when you can achieve it! Calculate the time required to afford a major purchase based on your income, savings rate, and the amount you can set aside.",
      imageUrl: "https://www.bankrate.com/2023/05/11164344/Real-Estate-When-should-I-buy-a-house-Personal-vs-Market.jpg?auto=webp&optimize=high&crop=16:9&width=912",
      route: "/no-page"
    },
    {
      id: 7,
      title: "Buy this vs Invest",
      text: "The difference between buying something and investing the same amount. Buy that nice car or invest the money?",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-nx350-exterior-109-641b4ca787aca.jpg?crop=0.757xw:0.671xh;0.0537xw,0.249xh&resize=1200:*",
      route: "/no-page"
    },
    {
      id: 8,
      title: "Mortgage Affordability Calculator",
      text: "Planning to buy a house? This calculator helps you estimate the mortgage amount you can afford based on your income, debts, and down payment. Plan your home purchase with confidence!",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-nx350-exterior-109-641b4ca787aca.jpg?crop=0.757xw:0.671xh;0.0537xw,0.249xh&resize=1200:*",
      route: "/no-page"
    },
    {
      id: 9,
      title: "Rent vs. Buy Calculator",
      text: "Should you rent or buy a home? This calculator compares the costs of renting versus buying a property over time, considering rent, home prices, taxes, and other factors.",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-nx350-exterior-109-641b4ca787aca.jpg?crop=0.757xw:0.671xh;0.0537xw,0.249xh&resize=1200:*",
      route: "/no-page"
    },
    {
      id: 10,
      title: "Student Loan Repayment Calculator",
      text: "Navigate your student loan repayment with ease! Enter your loan amount, interest rate, and term to see your monthly payment and total interest paid. Plan your way to financial freedom.",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-nx350-exterior-109-641b4ca787aca.jpg?crop=0.757xw:0.671xh;0.0537xw,0.249xh&resize=1200:*",
      route: "/no-page"
    },
    {
      id: 11,
      title: "Retirement Savings Planner",
      text: "Dreaming of a comfortable retirement? Find out how much you need to save based on your retirement goals, current age, and desired retirement age. Plan today for a secure tomorrow!",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2024-lexus-nx350-exterior-109-641b4ca787aca.jpg?crop=0.757xw:0.671xh;0.0537xw,0.249xh&resize=1200:*",
      route: "/no-page"
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
                <Route path="roi-calculator" element={<ROIPage />} />
                <Route path="investment-calculator" element={<ROIPage />} />
                <Route path="net-worth-calculator" element={<NetWorthPage />} />
              </Routes>
            </Col>
          </Row>
        </Container>

      </div>
    </Router>
  );
}

export default App;
