import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box p='20px' bg='gray.200' minH='100vh'>
      {children}
    </Box>
  );
};
