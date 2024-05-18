import { useState, useEffect } from 'react'
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap'
import styles from './InvestmentPage.module.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import InstructionPopup from '../components/InstructionPopup';

import { FaLightbulb } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



function InvestmentCard({
    id,
    investmentName,
    apy,
    years,
    initialAmount,
    earnings,
    totalContributions,
    interestGain,
    additionalContribution,
    contributionFrequency,
    onDelete
}) {
    const displayApy = isNaN(apy) ? 0 : apy;
    const displayInitialAmount = isNaN(initialAmount) || initialAmount === '' ? 0 : parseFloat(initialAmount);
    const displayEarnings = earnings !== undefined ? parseFloat(earnings) : 0;
    const displayTotalContributions = totalContributions !== undefined ? parseFloat(totalContributions) : 0;
    const displayInterestGain = interestGain !== undefined ? parseFloat(interestGain) : 0;
    const displayAdditionalContribution = additionalContribution !== undefined ? parseFloat(additionalContribution) : 0;

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    return (
        <Card className={styles.investmentCard}>
            <Card.Header>{investmentName}</Card.Header>
            <Card.Body>
                <Card.Text>Initial Amount: {formatCurrency(displayInitialAmount)}</Card.Text>
                <Card.Text>APY: {displayApy.toFixed(2)}%</Card.Text>
                {/* Other texts remain the same */}
                <Card.Text>Contributions: {formatCurrency(displayAdditionalContribution)} contributed <strong>{contributionFrequency}</strong> for {years} years</Card.Text>
                <Card.Text>Added contributions: {formatCurrency(displayTotalContributions)}</Card.Text>

                <Card.Text>Interest Gained: {formatCurrency(displayInterestGain)}</Card.Text>
                <Card.Text>Ending Balance: {formatCurrency(displayEarnings)}</Card.Text>
                <Button variant='primary' onClick={() => onDelete(id)}>Remove</Button>
            </Card.Body>
        </Card>
    );
}

// example popular investments data
// const popularInvestments = [
//     { name: "Marcus 4.4%", apy: 4.4, description: "High yield savings account" },
//     { name: "VOO Stock", apy: 7, description: "S&P 500 ETF" },
//     { name: "SPY Stock", apy: 8, description: "S&P 500 ETF" },
//     // ...other popular investments...
// ];

// function PopularInvestment({ investment, onAdd }) {
//     return (
//         <Card style={{ width: '18rem', margin: '10px' }}>
//             <Card.Body>
//                 <Card.Title>{investment.name}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">{investment.apy}% APY</Card.Subtitle>
//                 <Card.Text>{investment.description}</Card.Text>
//                 <Button variant="primary" onClick={() => onAdd(investment)}>Add</Button>
//             </Card.Body>
//         </Card>
//     );
// }

function InvestmentPage() {
    const [initialAmount, setInitialAmount] = useState('')
    const [numberOfYears, setNumberOfYears] = useState('')

    const [investments, setInvestments] = useState({})

    

    // const handleAddPopularInvestment = (investment) => {
    //     // Logic to add the popular investment to the list and update the chart
    //     // You might need to adjust this based on how you're managing state
    //     handleInvestmentSubmit({ // Assuming this is similar to your form submission
    //         target: {
    //             elements: {
    //                 investmentName: { value: investment.name },
    //                 apy: { value: investment.apy.toString() },
    //             }
    //         }
    //     });
    // };

    

    // state used for name validation
    const [investmentNameError, setInvestmentNameError] = useState(false)

    // states for instruction popup
    const [showInstructions, setShowInstructions] = useState(false)
    const handleShowInstructions = () => setShowInstructions(true)
    const handleCloseInstructions = () => setShowInstructions(false)

    // states for additional contributions
    const [additionalContribution, setAdditionalContribution] = useState('');
    const [contributionFrequency, setContributionFrequency] = useState('monthly'); // example options: 'weekly', 'biweekly', 'monthly', 'yearly'


    // update the cards when user updates
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const calculateTotalContributions = (initialAmount, additionalContribution, years, contributionFrequency) => {
        const validInitialAmount = isNaN(parseFloat(initialAmount)) ? 0 : parseFloat(initialAmount);
        const validAdditionalContribution = isNaN(parseFloat(additionalContribution)) ? 0 : parseFloat(additionalContribution);
        let periodsPerYear;

        switch (contributionFrequency) {
            case 'weekly': periodsPerYear = 52; break;
            case 'biweekly': periodsPerYear = 26; break;
            case 'monthly': periodsPerYear = 12; break;
            case 'yearly': periodsPerYear = 1; break;
            default: periodsPerYear = 12;
        }

        // const totalContributions = validInitialAmount + validAdditionalContribution * periodsPerYear * years;
        const totalContributions = validAdditionalContribution * periodsPerYear * years;
        return totalContributions;
    };



    useEffect(() => {
        const updatedInvestments = {};
        Object.entries(investments).forEach(([id, investment]) => {
            investment.initialAmount = parseFloat(initialAmount);
            const earnings = calculateEarnings(
                investment.apy,
                numberOfYears,
                initialAmount,
                additionalContribution,
                contributionFrequency
            );
            const totalContributions = calculateTotalContributions(
                initialAmount,
                additionalContribution,
                numberOfYears,
                contributionFrequency
            );
            const interestGain = earnings - totalContributions - initialAmount;

            updatedInvestments[id] = {
                ...investment,
                earnings: parseFloat(earnings),
                totalContributions: parseFloat(totalContributions),
                interestGain: parseFloat(interestGain)
            };
        });
        setInvestments(updatedInvestments);

        const newChartData = generateChartData(updatedInvestments);
        setChartData(newChartData);
    }, [investments, additionalContribution, contributionFrequency, initialAmount, numberOfYears]);




    const calculateEarnings = (apy, years, initialAmount, additionalContribution, contributionFrequency) => {
        let validInitialAmount = parseFloat(initialAmount) || 0;
        let validYears = parseInt(years, 10) || 0;
        let validApy = parseFloat(apy) / 100 / 12 || 0;
        let validAdditionalContribution = parseFloat(additionalContribution) || 0;

        let totalAmount = validInitialAmount;
        const contributionPerPeriod = calculateContributionPerPeriod(validAdditionalContribution, contributionFrequency);

        for (let month = 0; month < validYears * 12; month++) {
            totalAmount += totalAmount * validApy + contributionPerPeriod;
        }

        return isNaN(totalAmount) ? '0.00' : totalAmount.toFixed(2);
    };


    const calculateContributionPerPeriod = (contribution, frequency) => {
        switch (frequency) {
            case 'weekly': return contribution * 52 / 12;
            case 'biweekly': return contribution * 26 / 12;
            case 'monthly': return contribution;
            case 'yearly': return contribution / 12;
            default: return 0;
        }
    };

    // state for tracking the next ID

    const [nextId, setNextId] = useState(1);
    const handleInvestmentSubmit = (event) => {
        event.preventDefault();


        const { investmentName, apy } = event.target.elements;

        // trim investment name input of leading and trailing spaces
        const trimmedName = investmentName.value.trim()

        // check that investment name is entered
        if (!trimmedName) {
            setInvestmentNameError(true)
            return;
        }
        setInvestmentNameError(false)

        const newInvestment = {
            id: nextId, // assign the current nextId to the new investment
            name: trimmedName,
            apy: parseFloat(apy.value),
            years: numberOfYears,
            initialAmount: parseFloat(initialAmount),
            earnings: calculateEarnings(
                parseFloat(apy.value),
                numberOfYears,
                parseFloat(initialAmount),
                additionalContribution,
                contributionFrequency
            ),
        };

        setInvestments(prevInvestments => ({
            ...prevInvestments,
            [nextId]: newInvestment // use nextId as the key
        }));

        setNextId(nextId + 1); // increment the ID for the next investment
    };

    const deleteInvestment = (investmentId) => {
        setInvestments(prevInvestments => {
            const updatedInvestments = { ...prevInvestments };
            delete updatedInvestments[investmentId];
            return updatedInvestments;
        });
    };

    const chartColors = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(199, 199, 199, 0.6)",
        "rgba(83, 109, 254, 0.6)",
        "rgba(40, 167, 69, 0.6)",
        "rgba(255, 193, 7, 0.6)",
        "rgba(220, 53, 69, 0.6)",
        "rgba(23, 162, 184, 0.6)"
    ];
    const generateChartData = () => {
        const labels = Array.from({ length: Math.max(...Object.values(investments).map(inv => inv.years)) }, (_, i) => i + 1);
        const datasets = Object.entries(investments).map(([id, investment], index) => {
            // append the id to the investment name to make it unique. two datasets can have the same name
            const label = `${investment.name} (${id})`;
            const color = chartColors[index % chartColors.length];
            const data = Array.from({ length: investment.years }, (_, i) =>
                calculateEarnings(
                    investment.apy,
                    i + 1,
                    investment.initialAmount,
                    additionalContribution,
                    contributionFrequency
                )
            );

            return {
                label: label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: color,
                borderColor: color,
                pointBorderColor: color,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 10,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 20,
                data: data.map((d) => parseFloat(d) || 0)
            };
        });
        return { labels, datasets };
    };

    return (
        <div>
            <Container>
                <h1 className={styles.title}>Investment Strategy Analyzer</h1>

                <h2 className={styles.subtitle}> Explore and compare the growth potential of savings accounts, stocks, and bonds with diverse APYs.</h2>
                <Button variant="link" onClick={handleShowInstructions} className={styles.instructionButton}>
                    Instructions<FaLightbulb />
                </Button>

                <Row>

                    <Col md={6}>
                        <Form className={styles.formContainer}>
                            <Form.Group className="mb-3">
                                <Form.Label>Initial Amount</Form.Label>
                                <Form.Control
                                    name="initialAmountInput"
                                    type="number"
                                    value={initialAmount}
                                    placeholder="Enter initial amount"
                                    onChange={(e) => setInitialAmount(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Additional Contribution</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={additionalContribution}
                                    onChange={(e) => {

                                        const value = e.target.value;
                                        // check if the value is empty or NaN, and use 0 if it is NaN
                                        setAdditionalContribution(value === '' || isNaN(parseFloat(value)) ? '0' : parseFloat(value).toString());
                                    }}
                                    placeholder="Enter additional contribution"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Contribution Frequency</Form.Label>
                                <Form.Select
                                    value={contributionFrequency}
                                    onChange={(e) => setContributionFrequency(e.target.value)}
                                >
                                    <option value="weekly">Weekly</option>
                                    <option value="biweekly">Every 2 Weeks</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Number of Years</Form.Label>
                                <Form.Control
                                    name="yearsInput"
                                    type="number"
                                    value={numberOfYears}
                                    placeholder="Enter number of years"
                                    onChange={(e) => setNumberOfYears(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <Form className={styles.formContainer} onSubmit={handleInvestmentSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter Investment Name or Method</Form.Label>
                                {/* bootstap form validation to make sure name field is not empty */}
                                <Form.Control name="investmentName" type="text" placeholder="Enter investment name" isInvalid={investmentNameError} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>APY (%)</Form.Label>
                                <Form.Control name="apy" type="number" step="0.01" placeholder="Annual Percentage Yield" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Add Investment</Button>
                        </Form>
                    </Col>

                    <Col md={6} className={styles.chartContainer}>
                        <Line data={chartData} options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            // maintainAspectRatio: false, and also delete aspect ration line
                            aspectRatio: 2
                        }} />
                        {/* <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                            {popularInvestments.map((investment, index) => (
                                <PopularInvestment 
                                    key={index} 
                                    investment={investment} 
                                    onAdd={handleAddPopularInvestment} 
                                />
                            ))}
                        </div> */}
                    </Col>
                    
                </Row>

                

                <Row xs={1} md={2} lg={3}>
                    {Object.entries(investments).map(([id, investment]) => (
                        <Col key={id}>
                            <InvestmentCard
                                id={id}
                                investmentName={investment.name}
                                apy={investment.apy}
                                years={investment.years}
                                initialAmount={investment.initialAmount}
                                earnings={investment.earnings}
                                totalContributions={investment.totalContributions}
                                interestGain={investment.interestGain}
                                additionalContribution={additionalContribution}
                                contributionFrequency={contributionFrequency}
                                onDelete={deleteInvestment}
                            />
                        </Col>
                    ))}

                </Row>
            </Container>
            <InstructionPopup
                show={showInstructions}
                onHide={handleCloseInstructions}
                title="Savings Accounts Calculator Quick Guide"
            >
                <p>Use this tool to compare various investment methods and find the best strategy to maximize your returns over time.</p>
                <ul>
                    <li>Enter your initial investment and investment duration in years.</li>
                    <li>Add your regular contribution amount and frequency (weekly, biweekly, monthly, yearly).</li>
                    <li>Add investment methods with their names and APY using the form.</li>
                    <li>Review each investment's details and growth on the graph and cards.</li>
                    <li>Remove any investment using the 'Remove' button on its card.</li>
                    <li>Adjust inputs anytime to see updated calculations and comparisons.</li>
                </ul>
            </InstructionPopup>
        </div>

    )
}

export default InvestmentPage;