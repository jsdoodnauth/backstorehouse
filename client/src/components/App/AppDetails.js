import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

const styles = {
  root: {
    marginTop: "1.5rem"
  },
  card: {
    paddingTop: 50,
    height: "80%",
    display: "flex",
    flexDirection: "column"
  },
  cardActions: {
    margin: "auto 0 0"
  },
  media: {
    height: 140,
  },
  icons: {
    verticalAlign: "middle"
  },
  avatar: {
    margin: "auto",
    width: 100,
    height: 100,
    borderRadius: "20%"
  },
  contentContainer: {
    padding: 16
  },
  screenShotContainer: {
    overflowX: "scroll",
    overflowY: "hidden",
  },
  screenShotScrollContainer: {
    display: "flex",
    alignItems: "flex-end"
  },
  screenShot: {
    flex: "0 0 25%",
    width: "25%",
    padding: "0.5rem"
  } 
};

class AppDetails extends Component {
  state = {
    appDetail: []
  }

  componentDidMount = () => {
    const { id } = this.props;
    axios.get('http://localhost:3001/app/' + id)
      .then(res => {
        this.setState({
          appDetail: res.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    const { appDetail } = this.state;
    if (appDetail) {
      if (appDetail.screenshotUrls) {}
      const screenShotList = appDetail.screenshotUrls ? appDetail.screenshotUrls.split(',') : null;
      return(
        <Grid container spacing={16} >
          <Paper className={classes.root} elevation={1}>

          <Grid container>
            <Grid item xs={2} md={2} className={classes.contentContainer}>
            <Avatar alt={ appDetail.trackName } src={ appDetail.artworkUrl100 } className={classes.avatar} />
            </Grid>
            <Grid item xs={8} md={8} className={classes.contentContainer} >
              <Typography component="h3" variant="h4">
              { appDetail.trackName }
              </Typography>
              <Button size="small" size="small" href={ appDetail.sellerUrl }>
              { appDetail.sellerName }
              </Button>
              <Typography variant="caption" color="textSecondary">
              { appDetail.primaryGenreName }
              </Typography>
              
            </Grid>
            <Grid item xs={2} md={2} className={classes.contentContainer} align="right">
            { appDetail.contentAdvisoryRating }
            { appDetail.formattedPrice }
              <Button size="small" color="secondary" variant="outlined" href={ appDetail.trackViewUrl }>
                Download
              </Button>
            </Grid>
            <Divider />

            <Grid item xs={8} md={6} className={classes.contentContainer} >
            
            </Grid>
            <Grid item xs={8} md={6} className={classes.contentContainer} align="right">
            <Typography variant="caption" color="textSecondary">
            Version: { appDetail.version }
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Current:
              <StarRateIcon className={classes.icons} />{ appDetail.averageUserRatingForCurrentVersion }
              /
              <PermIdentityIcon className={classes.icons} />{ appDetail.userRatingCountForCurrentVersion }
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Overall:
              <StarRateIcon className={classes.icons} />{ appDetail.averageUserRating }
              /
              <PermIdentityIcon className={classes.icons} />{ appDetail.userRatingCount }
              </Typography>
            </Grid>
            <Divider />
              <Grid item xs={12} md={12} className={classes.contentContainer} >
                <div className={ classes.screenShotContainer }>
                  <div className={ classes.screenShotScrollContainer }>
                { screenShotList && screenShotList.map(url => {
                  return (
                    <img src={url} alt="Screenshot" className={ classes.screenShot } /> 
                  );
                }) }
                  </div>
                </div>
              </Grid>
            <Divider />
            <Grid item xs={8} md={8} className={classes.contentContainer} >
              <Typography component="p">
              { appDetail.description }
              </Typography>
            </Grid>
            <Grid item xs={8} md={4} className={classes.contentContainer} >
              <br />
              Kind: { appDetail.kind }
              <br />
              Kind: { appDetail.kind }
              
              Kind: { appDetail.kind }
              <br /><br /><br />
              Minimum OS: { appDetail.minimumOsVersion }
              <br />
              Advisories: { appDetail.advisories }
              <br />
              Genre: { appDetail.genres }
              <br />
              Supported: { appDetail.supportedDevices }
            </Grid>
          </Grid>
          
        </Paper>
      </Grid>
      );
    } else {
      return(
        <Grid item xs={6} xm={3}>
          <div className="container center">
            <p>Loading Details...</p>
          </div>
        </Grid>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    id
  }
}

export default compose(connect(mapStateToProps),withStyles(styles))(AppDetails);