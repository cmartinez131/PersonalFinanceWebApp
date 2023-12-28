import { useState } from 'react'
import NetWorthStyles from './NetWorthPage.module.css'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import InstructionPopup from '../components/InstructionPopup';
import { FaLightbulb } from 'react-icons/fa';

function NetWorthPage() {
    // state for controlling popup visibility
    const [showInstructions, setShowInstructions] = useState(false)

    const handleShowInstructions = () => setShowInstructions(true)
    const handleCloseInstructions = () => setShowInstructions(false)

    // useState hooks to keep the state of the form inputs
    const [assets, setAssets] = useState({
        cash: 0,
        realEstate: 0,
        cars: 0,
        collectibles: 0,
        stocks: 0,
        investments: 0,
        retirement: 0,
    });
    const [liabilities, setLiabilities] = useState({
        studentLoans: 0,
        mortgage: 0,
        carLoan: 0,
        otherLoans: 0,
    });
    const [netWorth, setNetWorth] = useState(0)

    // define assets and liabilities as arrays of objects
    const assetFields = [
        {
            name: 'cash',
            label: 'Checking Account',
            description: 'The total amount in your checking accounts.'
        },
        {
            name: 'savingsAccount',
            label: 'Savings Accounts',
            description: 'Total amount in your savings accounts, including high-yield savings accounts.'
        },
        {
            name: 'realEstate',
            label: 'Real Estate',
            description: 'Estimate the current market value of your house and other real estate properties you own.'
        },
        {
            name: 'cars',
            label: 'Cars',
            description: 'The current value of your car(s) or other vehicles. Think of how much you could sell them for today.'
        },
        {
            name: 'collectibles',
            label: 'Collectibles',
            description: 'The estimated value of any collectibles you own, such as art, coins, antiques, etc.'
        },
        {
            name: 'stocks',
            label: 'Stocks',
            description: 'The current market value of your stock investments, including individual stocks and ETFs.'
        },
        {
            name: 'investments',
            label: 'Investments',
            description: 'The value of other investments you have, such as bonds, mutual funds, or business investments.'
        },
        {
            name: 'retirement',
            label: 'Retirement Accounts',
            description: 'The total value of your retirement accounts like 401(k), IRA, or other pension plans.'
        },
    ];


    const liabilityFields = [
        {
            name: 'studentLoans',
            label: 'Student Loans',
            description: 'Total amount of your outstanding student loans.'
        },
        {
            name: 'mortgage',
            label: 'Mortgage',
            description: 'Total remaining balance on your mortgage or home loans.'
        },
        {
            name: 'carLoan',
            label: 'Car Loan',
            description: 'Total remaining balance on any car loans or vehicle financing.'
        },
        {
            name: 'creditCard',
            label: 'Credit Cards',
            description: 'Total current balance on your credit cards. Include all cards.'
        },
        {
            name: 'otherLoans',
            label: 'Other Loans and Debts',
            description: 'Any other outstanding loans or debts not covered above, like personal loans or medical debts.'
        }
    ];


    //helper function to create input fields
    const createInputFields = (fields, values, handleChange) => {
        return fields.map(field => (
            <label key={field.name}>
                {field.label}
                <p className={NetWorthStyles.description}>{field.description}</p>
                <input
                    type="text"
                    // if user enters a value, the field will show value. otherwise it will show '$'
                    value={values[field.name] ? `$${values[field.name].toLocaleString()}` : '$'}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                />
            </label>
        ))
    }

    const handleAssetChange = (name, value) => {
        // remove non-numeric characters except for decimal point, then convert to number
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
        // update the state with the numeric value
        setAssets(assets => ({
            ...assets, [name]: numericValue
        }))
    }

    const handleLiabilityChange = (name, value) => {
        const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
        setLiabilities(liabilities => ({
            ...liabilities, [name]: numericValue
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newNetWorth = calculatNetWorth()
        setNetWorth(newNetWorth);
    }

    function calculateTotalAssets() {
        return Object.values(assets).reduce((sum, value) => sum + value, 0);
    }

    function calculateTotalLiabilities() {
        return Object.values(liabilities).reduce((sum, value) => sum + value, 0);
    }

    function calculatNetWorth() {

        let totalAssets = 0
        let totalLiabilities = 0
        for (const key in assets) {
            totalAssets += assets[key]
        }
        for (const key in liabilities) {
            totalLiabilities += liabilities[key]
        }
        return totalAssets - totalLiabilities
    }

    // Array of objects for informational cards
    const infoCards = [
        {
            header: "What are Assets?",
            text: "Assets are everything you own that has monetary value, like cash, real estate, stocks, and personal property."
        },
        {
            header: "What are Liabilities?",
            text: "Liabilities are your financial obligations or debts, such as mortgages, car loans, and credit card debts."
        },
        {
            header: "How to Increase Net Worth?",
            text: "To increase your net worth, focus on decreasing liabilities (paying off debts) and increasing assets (savings and investments)."
        },
        {
            header: "Why is Knowing Your Net Worth Important?",
            text: "Knowing your net worth is important as it gives a snapshot of your financial health and can help guide financial decisions. It's a useful metric to track financial progress over time and set wealth-building goals."
        },
        {
            header: "What is a Mortgage?",
            text: "A mortgage is a type of loan used to buy or maintain a home, land, or other types of real estate. The borrower agrees to pay back the loan over a set period of time, typically in monthly payments."
        },
        {
            header: "What is Equity?",
            text: "Equity refers to the ownership value in an asset, such as a house or a company. In real estate, it's the difference between the property's current market value and the amount owed on the mortgage."
        },
        {
            header: "Is Salary Calculated into Net Worth?",
            text: "Salary is not directly included in net worth calculations. Net worth focuses on assets you currently own (like savings, investments, property) and liabilities (like loans, debts). While salary contributes to your ability to build assets and pay off liabilities, it's considered as a source of income rather than a part of your net worth."
        },
        {
            header: "What Affects Your Net Worth?",
            text: "Your net worth is affected by changes in the value of your assets (such as real estate, stocks, or personal property) and liabilities (like loans and debts). Increasing assets and decreasing liabilities positively affect your net worth."
        },
        {
            header: "What is a Negative Net Worth?",
            text: "Negative net worth occurs when total liabilities exceed total assets. It's often a sign that you may need to reassess and adjust your financial plans, focusing on debt reduction and asset accumulation."
        },
        {
            header: "How Often Should You Calculate Net Worth?",
            text: "It's recommended to calculate your net worth regularly, such as annually or semi-annually, to keep track of your financial progress and adapt your financial strategies accordingly."
        },
        {
            header: "How Can You Improve Your Net Worth?",
            text: "You can improve your net worth by increasing your assets (saving and investing more) and decreasing your liabilities (paying off debts). Regularly reviewing and adjusting your financial plan can also help."
        },
        {
            header: "Does Net Worth Include Home Equity?",
            text: "Yes, net worth includes home equity, which is the current market value of your home minus any outstanding mortgage or loan balance. It's part of your total assets."
        }

        // add ore cards here
    ]

    // generate card components from the infoCards array
    const generateInfoCards = () => {
        return infoCards.map((card, index) => (
            <Row key={index} className="mt-3">
                <Card className="infoCard">
                    <Card.Header as="h5" >{card.header}</Card.Header>

                    <Card.Body>
                        <Card.Text>{card.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        ));
    };

    const instructionContent = (
        <>
            <p>Use this tool to calculate your net worth by inputting your assets and liabilities.</p>
            <ul>
                <li>Enter values for various assets like cash, real estate, and investments.</li>
                <li>Input your liabilities, including loans and mortgages.</li>
                <li>Submit to see your total net worth calculated automatically.</li>
            </ul>
            <p>Regularly tracking your net worth helps in managing your financial health effectively.</p>
        </>
    );

    return (
        <Container>
            <div className={NetWorthStyles.netWorthPage}>

                <h1>Calculate Your Net Worth</h1>
                <Button variant="link" onClick={handleShowInstructions} className={NetWorthStyles.instructionButton}>
                    Instructions<FaLightbulb />
                </Button>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <h2>Assets: ${calculateTotalAssets().toLocaleString()}</h2>
                            {/* generate input field for each asset */}
                            {createInputFields(assetFields, assets, handleAssetChange)}
                        </Col>

                        <Col>
                            <h2>Liabilities: ${calculateTotalLiabilities().toLocaleString()} </h2>
                            {/* generate liability input fields */}
                            {createInputFields(liabilityFields, liabilities, handleLiabilityChange)}
                        </Col>
                    </Row>
                    <Row>
                        <input type="submit" value="Calculate Net Worth" />
                    </Row>
                    <Row>
                        <div className={NetWorthStyles.netWorthDisplay}>
                            <h2>Net Worth: ${netWorth.toLocaleString()}</h2>
                        </div>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <div className={NetWorthStyles.informationHeading}>
                            <h3>More information</h3>
                        </div>
                    </Row>

                    {generateInfoCards()}


                </form>

            </div>
            <InstructionPopup
                show={showInstructions}
                onHide={() => setShowInstructions(false)}
                title="Net Worth Calculator Instructions"
            >
                {instructionContent}
            </InstructionPopup>
        </Container>
    )
}

export default NetWorthPage;