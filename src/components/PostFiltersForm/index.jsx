import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null,
}

function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeOutRef = useRef(null);

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setSearchTerm(e.target.value);

        if (!onSubmit) return;

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }

        typingTimeOutRef.current = setTimeout(() => {
            const fromValues = {
                searchTerm: value,
            };

            onSubmit(fromValues);
        }, 300);
    }

    return (
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
        </form>
    );
}

export default PostFiltersForm;