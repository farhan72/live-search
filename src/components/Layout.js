import React, { Component } from 'react';
import './styles/Layout.css';
import DataComponent from './Data';
import Pagination from './Pagination';
import axios from 'axios';

export default class LayoutComponent extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            results: {},
            loading: false,
            limit: 5,
            page: 1,
            message: ''
        }

        this.cancel = '';
    }

    fetchSearchResult = async (limit, offset, query) => {
        const maxResults = `&per_page=${limit}`;
        const page = `&page=${offset}`;
        const querySearch = query ? `&q=${query}` : '';
        const sort = `&order=latest`;
        let API_URL = process.env.REACT_APP_BASE_URL_PIXABAY + '?key=' + process.env.REACT_APP_API_KEY_PIXABAY;
        API_URL += sort + maxResults + page + querySearch;
        if (this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        this.setState({ loading: true });
        await axios.get(API_URL, {
            cancelToken: this.cancel.token
        }).then(res => {
            this.setState({
                results: res.data,
                loading: false,
                message: 'successfull'
            })
        }).catch(error => {
            if (axios.isCancel(error) || error) {
                this.setState({
                    loading: false,
                    message: 'Failed to fetch data'
                });
            }
        });
    }

    handleOnInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            query: value
        }, () => this.searchResult());
    }

    handleClick = () => {
        this.searchResult();
    }

    setLimit = (event) => {
        this.setState({
            limit: event.target.value
        }, () => this.searchResult());
    }

    searchResult = () => this.fetchSearchResult(this.state.limit, this.state.page, this.state.query);

    componentDidMount() {
        this.searchResult();
    }

    renderDataResult = () => {
        const { results } = this.state;
        let data = <h1>Data Not Found</h1>;
        if (results.total > 0) {
            data = <DataComponent data={results} />;
        }
        return data;
    }

    paginate = (pageNumber) => this.setState({ page: pageNumber }, () => this.searchResult());

    render() {
        const { query, loading, limit } = this.state;
        console.log(this.state.page);
        const limitData = [5, 10, 25, 50];
        return (
            <div className="container">
                <h2 className="heading">Search Image</h2>
                <div className="input-group mb-3 input-group-lg">
                    <input type="text" className="form-control"
                        value={query}
                        onChange={this.handleOnInputChange}
                        placeholder="Search..." />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                            <i className="fa fa-search" aria-hidden="true" onClick={this.handleClick} />
                        </span>
                    </div>
                </div>
                <select onChange={this.setLimit} className="form-control col-md-1" defaultValue={this.state.limit}>
                    {
                        limitData.map((limit, i) => <option key={i}>{limit}</option>)
                    }
                </select>
                <img src="https://i.ibb.co/vZvp79z/ezgif-com-gif-maker.gif" alt="loader"
                    className={`search-loading ${loading ? 'show' : 'hide'}`} />
                <h2 className="mt-3">Search Key: {query}</h2>
                {this.renderDataResult()}

                {/* Pagination */}
                <Pagination totalData={80} limitPerPage={limit} paginate={this.paginate} />
            </div>
        )
    }
}
