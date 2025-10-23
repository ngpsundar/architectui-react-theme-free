import React, { Fragment ,useState} from "react";
import Slider from "react-slick";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap"; 
import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
import bg3 from "../../../assets/utils/images/originals/citynights.jpg";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from "../../../api/authService"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
const Login = () => {
   const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        const userData = await loginUser(values.username, values.password);
         login(userData.token);
        alert("Login successful!");
        navigate("/dashboards/crm");
      } catch (err) {
        setError(err.message || "Login failed. Try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    adaptiveHeight: true,
  };

  return (
    <Fragment>
      <div className="h-100">
        <Row className="h-100 g-0">
          {/* Left slider section */}
          <Col lg="4" className="d-none d-lg-block">
            <div className="slider-light">
              <Slider {...settings}>
                {[bg1, bg2, bg3].map((bg, i) => (
                  <div key={i} className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div className="slide-img-bg" style={{ backgroundImage: `url(${bg})` }} />
                    <div className="slider-content text-white">
                      <h3>Welcome</h3>
                      <p>Reusable validation + clean code = 🔥</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>

          {/* Right login form */}
          <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
              <div className="app-logo" />
              <h4 className="mb-0">
                <div>Welcome back,</div>
                <span>Please sign in to your account.</span>
              </h4>

              <h6 className="mt-3">
                No account?{" "}
                <a href="/" onClick={(e) => e.preventDefault()} className="text-primary">
                  Sign up now
                </a>
              </h6>

              <Row className="divider" />

              <div>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="username">User Name</Label>
                        <Input
                          type="text"
                          name="username"
                          id="username"
                         onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
                          placeholder="Enter your username"
                        />
                        {formik.touched.username && formik.errors.username ? (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          ) : null}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
                          placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup check>
                    <Input type="checkbox" id="remember" />
                    <Label for="remember" check>
                      Keep me logged in
                    </Label>
                  </FormGroup>

                  <Row className="divider" />

                  <div className="d-flex align-items-center">
                    <div className="ms-auto">
                      <Button color="link" size="lg" onClick={() => alert("Recover flow")}>
                        Recover Password
                      </Button>{" "}
                      <Button color="primary" size="lg" type="submit">
                        Login
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Login;
