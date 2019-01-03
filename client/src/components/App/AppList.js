import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const styles = {
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
    position: "relative",
    top: 50,
    borderRadius: "20%"
  },
};

class AppList extends Component {

  state = {
    applist: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/appsummary')
      .then(res => {
        this.setState({
          applist: res.data
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;
    const { applist } = this.state;
    const appList = applist.length ? (
      applist.map(customer => {
        return (
          <Grid item xs={6} xm={3} key={customer._id}>

            <Avatar alt={ customer.trackName } src={ customer.artworkUrl100 } className={classes.avatar} />
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                  { customer.trackName }
                  </Typography>
                  <Typography component="p">
                  { customer.description.trunc(100) }
                  </Typography>
                  <br />
                  <Typography component="small" color="textSecondary" variant="body1">
                  v{ customer.version }
                  </Typography>
                  <StarRateIcon className={classes.icons} />{ customer.averageUserRatingForCurrentVersion }
                  /
                  <PermIdentityIcon className={classes.icons} />{ customer.userRatingCountForCurrentVersion }
                  <br />
                  <StarRateIcon className={classes.icons} />{ customer.averageUserRating }
                  /
                  <PermIdentityIcon className={classes.icons} />{ customer.userRatingCount }
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" variant="outlined" href={ "/app/" + customer.trackId }>
                  Learn More
                </Button>
                <Button size="small" color="secondary" variant="outlined" href={ customer.trackViewUrl }>
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })
    ) : (
      <div className="center">No Apps</div>
    )
    return (
      <div className="container">
        <h2>Apps</h2>
        <Grid container spacing={24}>
        {appList}
        </Grid>
      </div>
    );
  }
}

String.prototype.trunc = String.prototype.trunc ||
function(n){
  return (this.length > n) ? this.substr(0, n-1) + '...' : this;
};

AppList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppList);