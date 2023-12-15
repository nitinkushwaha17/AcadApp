import { Box, Stack } from '@mui/material';
import AnnouncementList from '../components/announcementList';
import AssignmentList from '../components/assignmentList';
import SubjectList from '../components/subjectList';

export default function Home(){
    return (
        <>
            <Stack direction='row' flexWrap='wrap' gap={3}>
                <Box flexGrow={1}>
                    <AnnouncementList />
                    <Box sx={{my:3}}/>
                    <AssignmentList />
                </Box>
                <Box flexBasis='30%'>
                    <SubjectList />
                </Box>
            </Stack>
        </>
    )
}