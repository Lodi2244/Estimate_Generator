import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import "shards-ui/dist/css/shards.min.css";

import {
  Card,
  FormTextarea,
  FormInput,
  FormGroup,

} from "shards-react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerWord: "",
      Source: "",
      dataResp: {"totalPrice": "", "words": {} },
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:9292/countwords', {pricePerWord: this.state.pricePerWord, Source: this.state.Source})
    .then(resp => {
      this.setState({dataResp: resp.data});
    })
  };

  renderWords() {
    return Object.entries(this.state.dataResp.words).map( word => {
      return (
        <tr key={word[0]}>
            <td>{word[0]}</td>
            <td>{word[1]}</td>
          </tr>
      )
    })
  }

  renderTotal() {
      return (
            <i>{this.state.dataResp.totalPrice}</i>
      )
  }


  render(){
    return(
      <Card className="mx-auto mt-4 text-center p-5"
      style={{ maxWidth: "1000px", minHeight: "500px" }}
      >
      <h4 className="jumbotron mb-0 text-center">Estimate Generator</h4>
    <form id="estimate" onSubmit={this.onSubmit}>
      <br/>
      <br/>
      <FormGroup>
        <label className="col-sm-4 col-form-label">Price per word : </label>
          <FormInput
          name="pricePerWord"
          placeholder="$2/word"
          value={this.state.pricePerWord}
          onChange={e => this.onChange(e)}
          />
          </FormGroup>

      <br/>

      <FormGroup>
      <label className="col-sm-4 col-form-label">Text to translate : </label>
      <FormTextarea
        rows="4"
        cols="50"
        name="Source"
        placeholder="Lorem Ipsum..."
        value={this.state.Source}
        onChange={e => this.onChange(e)}
        ></FormTextarea>
        </FormGroup>

        <br/>
        <FormGroup>
        <div className="col-sm-12">
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </FormGroup>


</form>

<div>
<h4 className="jumbotron mb-0 text-center">Translation Estimate</h4>
<br/>

<table className="table table-sm">
<thead className="thead-light">
<tr>
<th scope="col">Word</th>
<th scope="col">Quantity</th>
</tr>
</thead>
<tbody>
{this.renderWords()}
</tbody>
<br/>
<thead className="thead-light">
<tr>
<th scope="col">Total</th>
</tr>
</thead>
<tbody>
<th scope="col">{this.renderTotal()} $</th>
</tbody>
</table>
</div>
</Card>

  )
  }
}
