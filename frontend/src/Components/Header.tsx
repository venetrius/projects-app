import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
    return (<>         
    <br/>
    <Row>
        <Col span={2}></Col>
        <Col span={2}>
            <Link to={'/'}>Home</Link>
        </Col>
        <Col span={2}>
            <Link to={'/projects/new'}>New Project</Link>
        </Col>
        <Col span={2}>
            <Link to={'/users'}>Users</Link>
        </Col>
        <Col span={12}></Col>
        <Col span={2}>
            <Link to={'/register'}>Register</Link>
        </Col>
    </Row></>);
}

export default Header;