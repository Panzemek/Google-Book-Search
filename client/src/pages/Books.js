import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    savedBooks: [],
    searchedBooks: {
      items: false
    },
    title: "",
    authors: "",
    description: "",
    smallThumbnail: "",
    canonicalVolumeLink: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          savedBooks: res.data,
          searchedBooks: [],
          title: "",
          authors: "",
          description: "",
          smallThumbnail: "",
          canonicalVolumeLink: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if (this.state.volumeInfo.title || this.state.volumeInfo.authors) {
    API.searchBook(this.state.title, this.state.authors).then(res => {
      this.setState({
        searchedBooks: res.data,
        title: "",
        authors: ""
      });
    });
  };

  saveBook = book => {
    API.saveBook({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.canonicalVolumeLink
    })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Find a book.</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                value={this.state.authors}
                onChange={this.handleInputChange}
                name="authors"
                placeholder="Authors"
              />
              <FormBtn
                // disabled={
                //   !(this.state.volumeInfo.title || this.state.volumeInfo.author)
                // }
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            <div>
              {this.state.searchedBooks.items ? (
                this.state.searchedBooks[
                  Object.keys(this.state.searchedBooks)[0]
                ].map(book => (
                  <Card
                    key={book.id}
                    image={book.volumeInfo.imageLinks.smallThumbnail}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                    link={book.volumeInfo.canonicalVolumeLink}
                    onClick={() => this.saveBook(book)}
                  />
                ))
              ) : (
                <h3>No results</h3>
              )}
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved</h1>
            </Jumbotron>
            <List>
              {this.state.savedBooks.map(book => (
                <ListItem key={book.id}>
                  <Link to={"/savedBooks/" + book.id}>
                    <strong>
                      {book.title} by {book.authors}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => this.deleteBook(book.id)} />
                </ListItem>
              ))}
            </List>
            ) : (<h3>No Saved Books</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
