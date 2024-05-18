import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import styles from '../pages/TakeHomePayPage.module.css'

function TakeHomePayPage() {
    const [salary, setSalary] = useState('')
    const [hourly, setHourly] = useState('')
    const [type, setType] = useState('') // Hourly or Salary
    const [location, setLocation] = useState('')


    const [state, setState] = useState('')
    const [filingStatus, setFilingStatus] = useState('')

    return (
        <div>
            <h1>Calculate your take home pay</h1>
            <Form>


            </Form>
        </div>
    )
}

export default TakeHomePayPage;