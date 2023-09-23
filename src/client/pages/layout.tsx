import DraggableModal from './demo';
import { Grid, withStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

const BaseGrid = withStyles({
  root: {
    border: '1px solid darkgray',
  },
})(Grid);

const GridWrapper = withStyles({
  root: {
    height: '100vh',
    width: '100%',
  },
})(BaseGrid);

const LeftSideBar = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'lightgrey',
    overflowY: 'scroll',
    flexWrap: 'nowrap',
  },
})(BaseGrid);

const TopLeftNavCard = withStyles({
  root: {
    flex: '0 0 80px',
    background: 'lightgrey',
  },
})(BaseGrid);

const PatientDetails = withStyles({
  root: {
    flex: '0 0 300px',
    background: 'lightgrey',
  },
})(BaseGrid);

const TabsNav = withStyles({
  root: {
    flex: '1 0 auto',
    background: 'lightgrey',
  },
})(BaseGrid);

const RightPane = withStyles({
  root: {
    padding: '0 20px',
    display: 'flex',
    overflow: 'scroll',
  },
})(BaseGrid);

const TitleHeading = withStyles({
  root: {
    flex: '0 0 80px',
    background: 'lightgrey',
  },
})(BaseGrid);

const CardsList = withStyles({
  root: {
    background: 'lightgrey',
  },
})(BaseGrid);

const BaseCard = withStyles({
  root: {
    background: 'lightgrey',
    height: '400px',
    borderRadius: '20px',
  },
})(BaseGrid);

export default function Layout() {
  const [minimizedModals, setMinimizedModals] = useState([]);
  const openModal = (modalId) => {
    console.log(modalId);
    const modalExists = modals.find((modal) => modal.id === modalId);
    if (!modalExists) {
      setModals([...modals, { isOpen: true, id: modalId }]);
    }
  };

  const closeModal = (modalId) => {
    setModals(modals.filter((modal) => modal.id !== modalId));
  };
  const minimizeModal = (modalId) => {
    setModals(modals.filter((modal) => modal.id !== modalId));
    setMinimizedModals([
      ...minimizedModals,
      <div key={modalId} onClick={() => restoreModal(modalId)}>
        Minimized
      </div>,
    ]);
  };
  const restoreModal = (modalId) => {
    setMinimizedModals(
      minimizedModals.filter(
        (_, index) => index !== minimizedModals.length - 1,
      ),
    );
    openModal(modalId);
  };

  const [modals, setModals] = useState([]);

  useEffect(() => {
    console.log('modals', modals);
  }, [modals]);

  // Function to close a dialog
  const handleCloseDialog = (id) => {
    console.log('close dialog', id);
    setModals((prevDialogs) =>
      prevDialogs.filter((dialog) => dialog.id !== id),
    );
  };

  return (
    <>
      <GridWrapper container>
        <LeftSideBar item container xs={2} direction="column">
          <TopLeftNavCard item>
            TopLeftNavCard Lorem ipsum dolor sit amet consectetur adipisicing
          </TopLeftNavCard>
          <PatientDetails item>
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            error vero debitis fuga earum dolorum quibusdam repudiandae
            aspernatur in Eius.
          </PatientDetails>
          <TabsNav>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          </TabsNav>
        </LeftSideBar>
        <RightPane item xs={10} direction="column">
          <TitleHeading></TitleHeading>
          <CardsList container justifyContent="space-between">
            <BaseCard item xs={4} onClick={() => openModal(0)}></BaseCard>
            <BaseCard item xs={8} onClick={() => openModal(1)}></BaseCard>
            <BaseCard item xs={4} onClick={() => openModal(2)}></BaseCard>
            <BaseCard item xs={8} onClick={() => openModal(3)}></BaseCard>
            <BaseCard item xs={4} onClick={() => openModal(4)}></BaseCard>
            <BaseCard item xs={8}></BaseCard>
            <BaseCard item xs={4}></BaseCard>
          </CardsList>
        </RightPane>
      </GridWrapper>
      {modals.map((modal) => (
        <DraggableModal
          key={modal.id}
          open={modal.open}
          onClose={(e) => handleCloseDialog(modal.id)}
          zIndex={modal.zIndex}
          id={modal.id}
        />
      ))}
    </>
  );
}
