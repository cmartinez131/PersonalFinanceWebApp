import { useState } from 'react'
import NetWorthStyles from './NetWorthPage.module.css'
import { Container, Row, Col, Card } from 'react-bootstrap'

function NetWorthPage() {

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
        { name: 'cash', label: 'Cash' },
        { name: 'realEstate', label: 'Real Estate' },
        { name: 'cars', label: 'Cars' },
        { name: 'collectibles', label: 'Collectibles' },
        { name: 'stocks', label: 'Stocks' },
        { name: 'investments', label: 'Investments' },
        { name: 'retirement', label: 'Retirement Accounts' },
    ]

    const liabilityFields = [
        { name: 'studentLoans', label: 'Student Loans' },
        { name: 'mortgage', label: 'Mortgage' },
        { name: 'carLoan', label: 'Car Loan' },
        { name: 'creditCard', label: 'Credit Cards' },
        { name: 'otherLoans', label: 'Other Loans and Debts' },
    ]

    //helper function to create input fields
    const createInputFields = (fields, values, handleChange) => {
        return fields.map(field => (
            <label key={field.name}>
                {field.label}
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
            header: "What is a Mortgage?",
            text: "A mortgage is a type of loan used to buy or maintain a home, land, or other types of real estate. The borrower agrees to pay back the loan over a set period of time, typically in monthly payments."
        },
        {
            header: "What is Equity?",
            text: "Equity refers to the ownership value in an asset, such as a house or a company. In real estate, it's the difference between the property's current market value and the amount owed on the mortgage."
        },
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

    return (
        <Container>
            <div className={NetWorthStyles.netWorthPage}>

                <h1>Calculate Your Net Worth</h1>
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
        </Container>
    )
}

export default NetWorthPage;