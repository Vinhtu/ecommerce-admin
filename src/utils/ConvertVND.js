import React from 'react';

const  ConvertVND = (data) => {
	return (
		<>
			{' '}
			{parseInt(data, 10).toLocaleString('it-IT', {
				style: 'currency',
				currency: 'VND',
			})}
		</>
	);
}

export default ConvertVND;
