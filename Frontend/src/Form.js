import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import "shards-ui/dist/css/shards.min.css";

import { Card } from "shards-react";

export default class Form extends React.Component {
  state = {
    pricePerWord: "",
    Source: "",
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    console.log(this.state);
    this.setState({
      pricePerWord: "",
      Source: "",
    });
  }

  render(){
    return(
      <div>
      <Card className="mx-auto mt-4 text-center p-5"
      style={{ maxWidth: "1000px", minHeight: "500px" }}
      >
      <h4 className="jumbotron mb-0 text-center">Translation Estimate</h4>
    <form id="estimate">
      <br/>
      <br/>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Price per word : </label>
        <div className="col-sm-2">
          <input
          name="pricePerWord"
          placeholder="$2/word"
          value={this.state.pricePerWord}
          onChange={e => this.change(e)}
          />
        </div>
      </div>
      <br/>

      <div className="form-group row">
      <label className="col-sm-4 col-form-label">Text to translate : </label>
      <div className="col-sm-2">
      <textarea
        rows="4"
        cols="50"
        form="estimate"
        name="textToTranslate"
        placeholder="Lorem Ipsum..."
        value={this.state.Source}
        onChange={e => this.change(e)}
        ></textarea>
        </div>
        </div>

        <br/>
        <div className="form-group row">
        <div className="col-sm-12">
        <button type="submit" className="btn btn-primary" form="estimate" onClick={ e => this.onSubmit(e)}>Submit</button>
        </div>
        </div>


</form>
</Card>
</div>
  )
  }

}
