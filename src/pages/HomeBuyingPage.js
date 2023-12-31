import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import styles from './HomeBuyingPage.module.css';
import InstructionPopup from '../components/InstructionPopup';
import { FaLightbulb } from 'react-icons/fa';

function HomeBuyingPage() {
    // State hooks
    const [homePrice, setHomePrice] = useState('');
    const [income, setIncome] = useState('');
    const [savingsRate, setSavingsRate] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [result, setResult] = useState({ years: 0, months: 0, monthlyMortgage: 0, downPayment: 0 });
    const [initialSavings, setInitialSavings] = useState('');

    const [showInstructions, setShowInstructions] = useState(false);
    const handleShowInstructions = () => setShowInstructions(true);
    const handleCloseInstructions = () => setShowInstructions(false);

    const homeBuyingInfoCards = [
        {
            header: "Understanding Mortgages",
            text: "A mortgage is a loan specifically for purchasing property, typically repaid over a period of 15 to 30 years."
        },
        {
            header: "Purchasing Property Without Full Cash Payment",
            text: "Most people don't buy a house outright in cash. Instead, they pay a percentage as a down payment and finance the remainder with a mortgage."
        },
        {
            header: "How to Save for a Down Payment",
            text: "Consider automating your savings, reducing expenses, increasing income, and using high-yield savings accounts. Buying a less expensive property initially can also help build equity towards a future property purchase."
        },
        {
            header: "Is a 20% Down Payment Necessary?",
            text: "A 20% down payment is not always required. Lower down payments may be possible but often require private mortgage insurance (PMI). Special programs are available for first-time buyers and VA loans that offer lower down payment options."
        },
        {
            header: "Options for Down Payment Amounts",
            text: "You can put down more or less than 20%. However, less than 20% often leads to higher monthly payments and additional insurance costs. Some lenders may require a 20% down payment for loan approval."
        },
        {
            header: "Understanding Home Equity",
            text: "Home equity is the portion of your property's value that you own outright, which is the difference between the property's value and the remaining mortgage balance."
        }
    ];


    // Function to calculate monthly savings
    const calculateMonthlySavings = () => {
        return income * (savingsRate / 100);
    };

    // Function to calculate down payment
    const calculateDownPayment = () => {
        return homePrice * 0.2; // 20% down payment
    };

    useEffect(() => {
        // Calculate the down payment required and subtract initial savings
        const downPaymentRequired = calculateDownPayment();
        const totalNeeded = Math.max(downPaymentRequired - initialSavings, 0); // Ensure it doesn't go negative

        // Calculate monthly savings and time needed
        const monthlySavings = calculateMonthlySavings();
        const totalMonths = monthlySavings > 0 ? totalNeeded / monthlySavings : 0;
        const years = Math.floor(totalMonths / 12);
        const months = Math.round(totalMonths % 12);

        // Calculate mortgage payment
        const monthlyMortgage = calculateMortgagePayment(homePrice - downPaymentRequired, interestRate, 30);

        // Update result state
        setResult({ years, months, monthlyMortgage, downPayment: downPaymentRequired });
    }, [homePrice, income, savingsRate, interestRate, initialSavings]);


    // Calculate the mortgage payment
    const calculateMortgagePayment = (principal, annualInterestRate, loanTermYears) => {
        const monthlyInterestRate = annualInterestRate / 100 / 12;
        const n = loanTermYears * 12; // total number of payments
        const payment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n) / (Math.pow(1 + monthlyInterestRate, n) - 1);
        return isNaN(payment) ? 0 : payment;
    };

    // Function to generate info cards
    const generateHomeBuyingInfoCards = () => {
        return homeBuyingInfoCards.map((card, index) => (
            <Row key={index} className="mt-3 infoCard">
                <Card className={styles.infoCard}>
                    <Card.Header as="h5">{card.header}</Card.Header>
                    <Card.Body>
                        <Card.Text>{card.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        ));
    };

    return (
        <Container className={styles.homeBuyingContainer}>
            <h1 className={styles.title}>Home Buying Calculator</h1>
            <h2 className={styles.subtitle}>Plan your path to homeownership. Estimate the time to save for a down payment and your future mortgage payments.</h2>
            <Button variant="link" onClick={handleShowInstructions} className={styles.instructionButton}>
                Instructions<FaLightbulb />
            </Button>
            <Form className={styles.form}>
                <Card className={styles.inputCard}>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>Price of the Home</Form.Label>
                                    <small className={styles.subtext}>
                                        Enter the total price of the home you wish to buy.
                                    </small>
                                    <Form.Control
                                        type="number"
                                        value={homePrice}
                                        onChange={(e) => setHomePrice(e.target.value)}
                                        placeholder="Enter home price"
                                        className={styles.input}
                                    />

                                </Form.Group>
                            </Col>

                            {/* savings Rate Input Field */}
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>Initial Savings</Form.Label>
                                    <small className={styles.subtext}>
                                        Enter the amount you already have saved for your home.
                                    </small>
                                    <Form.Control
                                        type="number"
                                        value={initialSavings}
                                        onChange={(e) => setInitialSavings(e.target.value)}
                                        placeholder="Enter initial savings"
                                        className={styles.input}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>Post-Tax Income (Monthly)</Form.Label>
                                    <small className={styles.subtext}>
                                        Enter your total income after taxes per month.
                                    </small>
                                    <Form.Control
                                        type="number"
                                        value={income}
                                        onChange={(e) => setIncome(e.target.value)}
                                        placeholder="Enter monthly income"
                                        className={styles.input}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>Savings Rate (%)</Form.Label>
                                    <small className={styles.subtext}>
                                        What percentage of your post-tax income will you save each month?
                                    </small>
                                    <Form.Control
                                        type="number"
                                        value={savingsRate}
                                        onChange={(e) => {
                                            let newRate = e.target.value;
                                            if (newRate === '') {
                                                setSavingsRate('');
                                            } else {
                                                newRate = parseFloat(newRate);
                                                if (!isNaN(newRate) && newRate >= 0 && newRate <= 100) {
                                                    setSavingsRate(newRate.toString());
                                                }
                                            }
                                        }}
                                        placeholder="Enter savings rate"
                                        className={styles.input}
                                        max="100"
                                    />

                                    {/* monthly savings display */}
                                    <div className={styles.monthlySavingsInfo}>
                                        <p className={styles.savingsInfoText}>
                                            <strong>Money saved every month: </strong>
                                            {calculateMonthlySavings().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </p>
                                        {/* <small className="text-muted d-block">
                                            Based on a savings rate of {savingsRate}% of your monthly income.
                                        </small> */}
                                    </div>
                                </Form.Group>
                            </Col>


                        </Row>
                        <Row>


                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.label}>Mortgage Interest Rate (%)</Form.Label>
                                    <small className={styles.subtext}>
                                        Enter the annual interest rate for a 30-year fixed mortgage. The average rate for 30-year fixed mortgage in 2023 is 7%.
                                    </small>
                                    <Form.Control
                                        type="number"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="Enter interest rate"
                                        className={styles.input}
                                    />

                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>


            </Form>

            {
    (result.years >= 0 && result.months >= 0) ? (
        <div className={styles.resultContainer}>
            <h3>Down Payment and Savings Details:</h3>
            <div className={styles.downPaymentSection}>
                <p><strong>Home Price:</strong> {isNaN(parseFloat(homePrice)) ? '$0.00' : parseFloat(homePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <p><strong>Down Payment Required (20%):</strong> {result.downPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>

                <p><strong>Time to Save for Down Payment:</strong> {result.years} Years and {result.months} Months</p>
            </div>
            <div className={styles.mortgageSection}>
                <p><strong>Estimated Monthly Mortgage Payment:</strong> {result.monthlyMortgage.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    <small className="text-muted d-block">
                        Based on a 30-year fixed mortgage.
                    </small>
                </p>
            </div>
        </div>
    ) : (
        <div className={styles.resultContainer}>
            <p>Please ensure all fields are correctly filled and that the savings rate is sufficient to save for a down payment.</p>
        </div>
    )
}
            <br />
            <br />
            <br />

            <Row className="mt-4">
                <Col>
                    {generateHomeBuyingInfoCards()}
                </Col>
            </Row>
            <InstructionPopup
                show={showInstructions}
                onHide={handleCloseInstructions}
                title="Home Buying Calculator Quick Guide"
            >
                <p>Quickly estimate the time needed for a home down payment and future mortgage payments.</p>
                <ul>
                    <li>Enter the home's price, your income, and how much you can save monthly.</li>
                    <li>Specify the expected mortgage interest rate.</li>
                    <li>Review the calculated time for saving the down payment and estimated mortgage payments.</li>
                    <li>Adjust inputs to test different buying scenarios.</li>
                </ul>
            </InstructionPopup>
        </Container>
    );
}

export default HomeBuyingPage;
