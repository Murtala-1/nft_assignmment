import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import CustomText from "./CustomText";
import Loading from "./Loading";
import { useNfts } from "./hooks";
import { _getNfts } from "../script";

export default function NFTsList() {
  const [select, setSelect] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [walletOwner, setWalletOwner] = useState("vitalik.eth");

  const toggle = () => setOpenModal(!openModal);
  const { nfts, loading, error } = useNfts(walletOwner);

  useEffect(() => {
    (async () => {
      await _getNfts(walletOwner).then((e) => console.log(e));
    })();
  }, [walletOwner]);

  return (
    <div>
      {/* <small style={{ padding: 10 }}> {JSON.stringify(openModal)}</small> */}
      <center>
        <h1 className="display-4">NFT Viewer</h1>
        <div className=" m-4">
          <Label htmlFor="wallet-owner">&nbsp; Wallet address: &nbsp;</Label>
          <Input
            id="wallet-owner"
            type="text"
            className="w-50"
            value={walletOwner || ""}
            onChange={(e) => setWalletOwner(e.target.value)}
            placeholder="Enter a NFTs owned here to view NFTs"
          />
        </div>
      </center>

      {!loading && <Loading />}

      <Row className="p-0 m-0">
        {nfts.map((item, index) => {
          const { contract } = item;
          return (
            <>
              <Col
                md={3}
                key={index}
                className="card shadow p-4 col-md-3"
                onClick={() => {
                  setSelect(item);
                  toggle();
                }}
              >
                <img
                  className="imd-fluid"
                  src={contract?.openSea.imageUrl}
                  alt={contract.name}
                />
                <h5 className="text-bold mt-8">{contract.name}</h5>
              </Col>
            </>
          );
        })}
        {error && (
          <div className="display-4">
            <p className="text-danger">
              Error: Unable to resolve owner name through ENS
            </p>
          </div>
        )}
      </Row>

      <SelectedItemModal
        toggle={toggle}
        select={select}
        openModal={openModal}
      />
    </div>
  );
}

function SelectedItemModal({ toggle = (f) => f, select = {}, openModal }) {
  const { contract } = select;
  return (
    <Modal isOpen={openModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        <center>
          <img
            className="imd-fluid"
            src={contract?.openSea?.imageUrl}
            alt={contract?.name}
          />
        </center>

        <CustomText label="Balance:" value={select?.balance} />
        <h5 className="text-bold mt-8">{contract?.name}</h5>
        <p>{contract?.openSea?.description}</p>
        <CustomText label="Address:" value={contract?.address} />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            //can't find opensea route in the api
            window.open(select.tokenUri.gateway, "_blank");
            toggle();
          }}
        >
          View in opensea
        </Button>{" "}
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
