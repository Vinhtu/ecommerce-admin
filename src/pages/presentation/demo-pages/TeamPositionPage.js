import React, { useState } from 'react';
import moment from 'moment';
import { Calendar as DatePicker } from 'react-date-range';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import TeamComponent from '../../common/TeamComponent';
import PositionComponent from '../../common/PositionComponent';
import Popovers from '../../../components/bootstrap/Popovers';
// import { demoPages } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';

const TeamPositionPage = () => {
	const [isTag, setIsTag] = React.useState('team');

	
	const { themeStatus } = useDarkMode();

	const [date, setDate] = useState(new Date());

	return (
		<PageWrapper
		//  title={demoPages.listPages.subMenu.listFluid.text}
		 >
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have{' '}
						<Button color='info' isLight onClick={() => setIsTag('team')}>
							Team
						</Button>{' '}
						<Button color='info' isLight onClick={() => setIsTag('position')}>
							Position
						</Button>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Popovers
						desc={
							<DatePicker
								onChange={(item) => setDate(item)}
								date={date}
								color={process.env.REACT_APP_PRIMARY_COLOR}
							/>
						}
						placement='bottom-end'
						className='mw-100'
						trigger='click'>
						<Button color={themeStatus}>
							{`${moment(date).startOf('weeks').format('MMM Do')} - ${moment(date)
								.endOf('weeks')
								.format('MMM Do')}`}
						</Button>
					</Popovers>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				{isTag === 'team' && <TeamComponent isFluid />}
				{isTag === 'position' && <PositionComponent isFluid />}
			</Page>
		</PageWrapper>
	);
};

export default TeamPositionPage;
