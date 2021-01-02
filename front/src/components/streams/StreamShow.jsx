import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = ({ match, fetchStream, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  const renderContent = () => {
    if (!stream) {
      return (
        <div className='ui segment'>
          <div className='ui active inverted dimmer'>
            <div className='ui text loader'>Loading</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
