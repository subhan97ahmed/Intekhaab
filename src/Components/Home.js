import React, { Component } from 'react';
import { Table, Container, Button } from "react-bootstrap"

class Home extends Component {
    render() {
        const prompList = [
            "who will win election of 2022?",
            "who will win election of 2022?",
            "who will win election of 2022?",
            "who will win election of 2022?",
        ];
        return (
            <Container>
                <Table style={{ margin: "5vh" }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>List of Polls</th>
                            <th>Go to Poll</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prompList.map((el, index) => {
                                return (<tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {el}
                                    </td>
                                    <td>
                                        <Button>Go to Poll</Button>
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Home;