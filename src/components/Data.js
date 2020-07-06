import React, { Component } from 'react'

export default class DataComponent extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className="results-container">
                {
                    data.hits.map(item => {
                        return (
                            <div key={item.id} className="card" style={{ width: '18rem' }}>
                                <img src={item.previewURL} alt={item.tags} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.tags}</h5>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
