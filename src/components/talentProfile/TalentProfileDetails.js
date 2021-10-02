/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import {
  Box, Card, CardContent, CardHeader, Divider, Grid, Tab, Tabs, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Certification from './Certification';
import EducationHistory from './EducationHistory';
import JobExpectation from './JobExpectation';
import JobHistory from './JobHistory';
import PersonalDetails from './PersonalDetails';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
}));

const TalentProfileDetails = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isNewForm, setNewForm] = useState(true);
  // const { state } = useLocation();
  // const dispatch = useDispatch();

  const handleEdit = (edit) => { if (edit) setValue(0); };

  const handleTabChange = (event, newValue) => setValue(newValue);

  return (
    <Card>
      <Grid container spacing={3}>
        <Grid item md={6} xs={8}>
          <CardHeader title="Talent Profile" />
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <div className={classes.root}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Personal" />
              <Tab label="Job History" />
              <Tab label="Education History" />
              <Tab label="Certification" />
              <Tab label="Job Expectation" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <PersonalDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <JobHistory />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EducationHistory />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Certification />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <JobExpectation />
            </TabPanel>
          </div>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default TalentProfileDetails;
