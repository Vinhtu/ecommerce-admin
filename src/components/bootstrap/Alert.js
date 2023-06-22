import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TagWrapper from '../TagWrapper';
import Icon from '../icon/Icon';

export const AlertHeading = ({ className, children, tag, ...props }) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<TagWrapper tag={tag} className={classNames('alert-heading', className)} {...props}>
			{children}
		</TagWrapper>
	);
};
AlertHeading.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};
AlertHeading.defaultProps = {
	className: null,
	tag: 'h4',
};

export const AlertLink = ({ className, children, href, to, ...props }) => {
	const _LinkClasses = classNames('alert-link', className);
	if (to) {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<NavLink to={to} className={_LinkClasses} {...props}>
				{children}
			</NavLink>
		);
	}
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<a href={href} className={_LinkClasses} {...props}>
			{children}
		</a>
	);
};
AlertLink.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string,
	to: PropTypes.string,
};
AlertLink.defaultProps = {
	className: null,
	href: null,
	to: null,
};

const Alert = ({
	children,
	className,
	color,
	isDismissible,
	isOutline,
	isLight,
	shadow,
	icon,
	rounded,
	borderWidth,
	...props
}) => {
	const [status, setStatus] = useState(true);
	if (status) {
		return (
			<div
				className={classNames(
					'alert',
					{
						[`alert-${color}`]: color && !(isLight || isOutline),
						'alert-dismissible': isDismissible,
						fade: isDismissible,
						show: isDismissible,
						[`alert-light-${color}`]: isLight,
						[`alert-outline-${color}`]: isOutline,
						[`shadow${shadow !== 'md' ? `-${shadow}` : ''}`]:
							!!shadow && shadow !== '3d',
						[`border-${borderWidth}`]: borderWidth || borderWidth === 0,
						[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]:
							rounded || rounded === 0,
						[`shadow-3d-${color}`]: shadow === '3d',
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
				role='alert'>
				{icon ? (
					<>
						<div className='alert-icon'>
							<Icon icon={icon} />
						</div>
						<div className='alert-text'>{children}</div>
					</>
				) : (
					children
				)}
				{isDismissible && (
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={() => setStatus(false)}
					/>
				)}
			</div>
		);
	}
	return null;
};
Alert.propTypes = {
	borderWidth: PropTypes.oneOf([null, 0, 1, 2, 3, 4, 5]),
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	icon: PropTypes.string,
	isDismissible: PropTypes.bool,
	/**
	 * Light background color
	 */
	isLight: PropTypes.bool,
	/**
	 * borderWidth must not be 0 to be IsOutline
	 */
	isOutline: PropTypes.bool,
	shadow: PropTypes.oneOf([null, 'sm', 'md', 'lg', '3d']),
	rounded: PropTypes.oneOf([null, 'default', 0, 1, 2, 3, 'pill']),
};
Alert.defaultProps = {
	borderWidth: null,
	className: null,
	color: 'primary',
	icon: null,
	isDismissible: false,
	isLight: false,
	isOutline: false,
	shadow: null,
	rounded: null,
};

export default Alert;









// {arrColorThumbnailSizePriceVitural.length > 0 &&
// 	arrColorThumbnailSizePriceVitural.map((item) => {
// 		return (
// 			<div
// 				style={{
// 					display: 'flex',
// 					marginTop: 8,
// 					padding: '8px 16px',
// 					borderWidth: 1,
// 					borderStyle: 'dashed',
// 					borderRadius: 10,
// 					borderColor: '#E9E5E5',
// 					alignItems: 'center',
// 					flexWrap: 'wrap',
// 				}}>
// 				<div className='mt-2'>
// 					<div>Color: {item.color}</div>
// 					<div
// 						style={{
// 							width: 80,
// 							height: 80,
// 							borderRadius: 10,
// 							display: 'flex',
// 							justifyContent: 'center',
// 							alignItems: 'center',
// 							borderStyle: 'dashed',
// 							borderColor: '#E9E5E5',
// 							backgroundImage: `url(${item.thumbnailcolor}`,
// 							backgroundSize: 'cover',
// 							cursor: 'pointer',
// 							'&:hover': {
// 								opacity: 0.5,
// 							},
// 							position: 'relative',
// 						}}></div>
// 				</div>

// 		   {item.sizeprice.map(size => {
// 			return(<div
// 				style={{
// 					padding: 4,
// 					borderRadius: 4,
// 					backgroundColor: '#FBECE9',
// 					display: 'flex',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					marginRight: 4,
// 					marginTop: 4,
// 					fontSize: 12,
// 					position: 'relative',
// 				}}>
// 				{size.name} - {size.price}đ - {size.p_price}đ
// 				<div
// 					onClick={() =>
// 						deleteArrColor(item.color)
// 					}
// 					onKeyDown={() =>
// 						deleteArrColor(item.color)
// 					}
// 					role='button'
// 					tabIndex='0'
// 					style={{
// 						position: 'absolute',
// 						top: -4,
// 						right: -4,
// 						color: 'red',
// 						zIndex: 1,
// 						fontSize: 10,
// 						display: 'flex',
// 						justifyContent: 'center',
// 						alignItems: 'center',
// 						width: 10,
// 						height: 10,
// 						borderRadius: 50,
// 						backgroundColor: '#FBECE9',
// 						cursor: 'pointer',
// 					}}>
// 					x
// 				</div>
// 			</div>)
// 		   })}
				
// 			</div>
// 		);
// 	})}




// 	const saveColor = () => {
// 		setIsOpenColor(false);
// 		setArrColorThumbnailSizePriceVitural((current) => [
// 			...current,
// 			{
// 				color: colorVitural,
// 				thumbnailcolor: thumbnailColorVitural,
// 				sizeprice: arrSizePriceVitural,
// 			},
// 		]);
// 	};
// 	const deleteArrColor = () => {
// 		setArrColorThumbnailSizePriceVitural(arrSizePriceVitural.filter((items) => items.name !== data));
// 	}
	