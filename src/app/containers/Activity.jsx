import React, { useEffect, useState } from 'react';
import {
    Grid,
    CircularProgress
} from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from 'prop-types';
//import * as actions from '../actions/auth';
//import { fetchActivityAction } from '../actions/activity';

const renderItems = (data) => {
    const parent = [];
    data.map((activity) => {
        console.log(activity);
        parent.push(
            <Grid container key={activity.id}>
                <Grid item xs={3}>
                    <Moment interval={1000} fromNow>{activity.createdAt}</Moment>
                </Grid>
                <Grid item xs={3} align="center">
                    {activity.type === 'register' && 'Register'}
                    {activity.type === 'registerVerified' && 'Registration Verified'}
                    {activity.type === 'login' && 'Login'}
                    {activity.type === 'logout' && 'Logout'}
                    {activity.type === 'depositAccepted' && 'Deposit Accepted'}
                    {activity.type === 'depositComplete' && 'Deposit Complete'}
                    {activity.type === 'createSurfOrder' && 'Create Surf Order'}
                    {activity.type === 'cancelSurfOrder' && 'Cancel Surf Order'}
                    {activity.type === 'surfStart' && 'Surf Start'}
                    {activity.type === 'surfComplete' && 'Surf Complete'}
                    {activity.type === 'newDomain' && 'New Domain Discovered'}
                    {activity.type === 'buyWebslot' && 'Buy Extra Webslot'}
                    {activity.type === 'withdrawRequested' && 'Withdrawal Requested'}
                    {activity.type === 'withdrawAccepted' && 'Withdrawal Accepted'}
                    {activity.type === 'withdrawRejected' && 'Withdrawal Rejected'}
                    {activity.type === 'withdrawComplete' && 'Withdrawal Complete'}
                    {activity.type === 'jackpot' && 'Jackpot'}
                    {activity.type === 'faucetClaim' && 'Faucet Claim'}
                    {activity.type === 'referralBonus' && 'Referral Bonus'}
                    {activity.type === 'createBannerOrder' && 'Create Banner Order'}
                    {activity.type === 'cancelBannerOrder' && 'Cancel Banner Order'}
                    {activity.type === 'uniqueImpression' && 'Unique Banner Impression'}
                    {activity.type === 'buyBannerslot' && 'Buy Extra Banner Slot'}
                    {activity.type === 'buyPublisherslot' && 'Buy Extra Publisher Slot'}
                    {activity.type === 'buyAdzoneslot' && 'Buy Extra AdZone Slot'}
                </Grid>
                <Grid item xs={6} align="center">
                    {activity.type === 'register' && `${activity.earner.username} registered an account`}
                    {activity.type === 'registerVerified' && `${activity.earner.username} verified account`}
                    {activity.type === 'login' && `${activity.earner.username} logged in`}
                    {activity.type === 'logout' && `${activity.earner.username} logged out`}
                    {activity.type === 'depositAccepted' && `RunesX accepted ${activity.earner.username}'s deposit`}
                    {/** for ${activity.amount / 1e8} RUNES */}
                    {activity.type === 'depositComplete' && `RunesX confirmed ${activity.earner.username}'s deposit`}
                    {/** for ${activity.amount / 1e8} RUNES */}
                    {activity.type === 'createSurfOrder' && `${activity.spender.username} create order ${activity.order.amount} * ${activity.order.price / 1e8}/view`}
                    {activity.type === 'cancelSurfOrder' && `${activity.spender.username} cancel order ${activity.order.amount - activity.order.filled} * ${activity.order.price / 1e8}/view`}
                    {activity.type === 'surfStart' && `${activity.earner.username} ${String.fromCharCode(8658)} ${activity.spender.username} (${activity.order.webslot.domain.domain})`}
                    {activity.type === 'surfComplete' && `${activity.spender.username}(-${activity.order.price / 1e8}) ${String.fromCharCode(8658)} ${activity.earner.username}(+${(activity.order.price - ((activity.order.price / 100) * 2)) / 1e8}) (${activity.order.webslot.domain.domain})`}
                    {activity.type === 'newDomain' && `${activity.domainActivity.domain} (${activity.earner.username})`}
                    {activity.type === 'buyWebslot' && `${activity.spender.username} bought an exta webslot`}
                    {activity.type === 'withdrawRequested' && `${activity.spender.username} requested a withdrawal`}
                    {activity.type === 'withdrawAccepted' && `${activity.spender.username} withdrawal accepted`}
                    {activity.type === 'withdrawRejected' && `${activity.spender.username} withdrawal rejected`}
                    {activity.type === 'withdrawComplete' && `${activity.spender.username} withdrawal complete`}
                    {activity.type === 'jackpot' && `${activity.earner.username} won ${activity.amount / 1e8} RUNES`}
                    {activity.type === 'faucetClaim' && `${activity.earner.username} claimed ${activity.amount / 1e8} RUNES`}
                    {activity.type === 'referralBonus' && `${activity.earner.username} earned ${(activity.amount / 1e8).toLocaleString('fullwide', { useGrouping: true, maximumSignificantDigits: 8 })} from ${activity.spender.username}`}
                    {activity.type === 'createBannerOrder' && `${activity.spender.username} create order ${activity.bannerOrder.amount} * ${activity.bannerOrder.price / 1e8}/unique impression`}
                    {activity.type === 'cancelBannerOrder' && `${activity.spender.username} cancel order ${activity.bannerOrder.amount - activity.bannerOrder.filled} * ${activity.bannerOrder.price / 1e8}/unique impression`}
                    {activity.type === 'uniqueImpression' && `${activity.spender.username}(-${activity.bannerOrder.price / 1e8}) (${activity.bannerOrder.banner.subdomain && activity.bannerOrder.banner.subdomain !== 'www' ? `${activity.bannerOrder.banner.subdomain}.` : ''}${activity.bannerOrder.banner.domain.domain}) ${String.fromCharCode(8658)}  ${activity.earner.username}(+${(activity.bannerOrder.price - ((activity.bannerOrder.price / 100) * 2)) / 1e8}) (${activity.publisher.subdomain && activity.publisher.subdomain !== 'www' ? `${activity.publisher.subdomain}.` : ''}${activity.publisher ? activity.publisher.domain.domain : ''})`}
                    {activity.type === 'buyBannerslot' && `${activity.spender.username} bought an extra banner slot`}
                    {activity.type === 'buyPublisherslot' && `${activity.spender.username} bought an extra publisher slot`}
                    {activity.type === 'buyAdzoneslot' && `${activity.spender.username} bought an extra AdZone slot`}
                </Grid>

            </Grid>,
        );
        return true;
    });
    return parent;
}

const ActivityContainer = (props) => {
    const { activity } = props;
    useEffect(() => { }, [activity]);
    const activitiesPerPage = 20;
    const totalPages = !activity.loading
        && activity.data
        ? Math.ceil(activity.data.length / activitiesPerPage)
        : 0;
    const [activePage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        if (totalPages > activePage) {
            setCurrentPage(activePage + 1)
        }
    };

    const handlePreviousPage = () => {
        if (activePage > 1) {
            setCurrentPage(activePage - 1)
        }
    };

    // Logic for displaying current todos
    const indexOfLastActivity = activePage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;

    return (
        <Grid container item xs={12} className="shadow-w index600 glassHeaderActivity" style={{ marginTop: '40px' }}>
            <Grid item xs={2} className="textcenter" mx="auto">
                <ArrowBackIcon
                    onClick={handlePreviousPage}
                    className={activePage > 1 ? 'previousArrowActive' : 'previousArrowDisabled'}
                    style={{ fontSize: '40px', float: 'left' }}
                />
            </Grid>
            <Grid item xs={8}>
                <h3 className="textCenter">Activity</h3>
            </Grid>
            <Grid item xs={2} className="textcenter">
                <ArrowForwardIcon
                    onClick={handleNextPage}
                    className={totalPages > activePage ? 'nextArrowActive' : 'nextArrowDisabled'}
                    style={{ fontSize: '40px', float: 'right' }}
                />
                <Grid />
            </Grid>
            <Grid container item xs={12} className="shadow-w pl-20 glassHeader">
                {
                    !activity.loading
                        && activity.data
                        ? renderItems(activity.data.slice(indexOfFirstActivity, indexOfLastActivity))
                        : <CircularProgress />
                }
            </Grid>
        </Grid>
    )
}

export default connect(mapStateToProps, null)(ActivityContainer);