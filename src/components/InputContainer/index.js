import React from 'react';
import propTypes from 'prop-types';

class InputContainer extends React.Component {
  renderInput() {
    const {
      labelcontent,
      id,
      type,
      onChange,
      placeholder,
      value,
    } = this.props;

    const input = (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        autoComplete="off"
        spellCheck="false"
        autoCorrect="off"
      />
    );

    if (!labelcontent) {
      return input;
    }

    return (
      <>
        {/* eslint-disable-next-line */}
        <label htmlFor={id}>{labelcontent}</label>
        {input}
      </>
    );
  }

  renderMessage() {
    const {
      status,
      inputMessageContent,
    } = this.props;

    if (!inputMessageContent) {
      return null;
    }

    return <small className={status}>{inputMessageContent}</small>;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.renderInput()}
        {this.renderMessage()}
      </div>
    );
  }
}

InputContainer.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
  labelcontent: '',
  inputMessageContent: '',
  status: '',
};


InputContainer.propTypes = {
  className: propTypes.string,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string,
  labelcontent: propTypes.string,
  inputMessageContent: propTypes.string,
  status: propTypes.string,
};

export default InputContainer;
