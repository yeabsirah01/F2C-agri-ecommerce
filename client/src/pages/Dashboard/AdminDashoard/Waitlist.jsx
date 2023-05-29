import axiosConfig from "../../../axiosConfig";
import "../../../data/font.css";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  LoadingOverlay,
  Modal,
  Image,
  Badge,
} from "@mantine/core";

const WaitlistTable = () => {
  const [waitlist, setWaitlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const token = `Bearer ${localStorage.getItem("cookie")}`;
  useEffect(() => {
    const getWaitlist = async () => {
      setIsLoading(true);
      try {
        const response = await axiosConfig.get("/waitlist");
        if (response.status === 200) {
          setWaitlist(response.data);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    getWaitlist();
  }, []);

  const handleApprove = async (waitlistId) => {
    try {
      const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
        status: "approved",
      });

      if (response.status === 200) {
        // Update the waitlist with the new status
        const updatedWaitlist = waitlist.map((item) =>
          item._id === response.data._id
            ? { ...item, status: response.data.status }
            : item
        );
        setWaitlist(updatedWaitlist);

        // Delete the waitlist item after 4 seconds
        setTimeout(() => {
          const newWaitlist = waitlist.filter(
            (item) => item._id !== waitlistId
          );
          setWaitlist(newWaitlist);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (waitlistId) => {
    try {
      const response = await axiosConfig.put(`/waitlist/${waitlistId}`, {
        status: "rejected",
      });

      if (response.status === 200) {
        // Remove the waitlist item from the list after 4 seconds
        setTimeout(() => {
          const updatedWaitlist = waitlist.filter(
            (item) => item._id !== waitlistId
          );
          setWaitlist(updatedWaitlist);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const [showOneByOne, setShowOneByOne] = useState(true); // State to toggle between one by one and view all

  const toggleRows = () => {
    setShowOneByOne(!showOneByOne);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedText(null);
  };

  const handleTextClick = (text) => {
    setSelectedText(text);
  };

  console.log(waitlist);
  return (
    <>
      <div>
        <h2>Applicant Users</h2>
        <LoadingOverlay
          loaderProps={{ size: "sm", color: "green", variant: "bars" }}
          visible={isLoading}
        />

        <Button variant="outline" onClick={toggleRows}>
          {showOneByOne ? "View All" : "One by One"}
        </Button>
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>User Photo</th>
              <th>Farm License</th>
              <th>National Id photo</th>
              <th>Farm Sample photo</th>
              <th>Application Letter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {waitlist
              .sort(
                (a, b) =>
                  new Date(b.applicationDate) - new Date(a.applicationDate)
              )
              .map(
                (
                  item,
                  index // Add 'index' as the second argument
                ) => (
                  <tr
                    key={item._id}
                    style={{
                      display: showOneByOne
                        ? index === 0
                          ? "table-row"
                          : "none"
                        : "table-row",
                      color: index % 2 !== 0 ? "white" : "black",
                      backgroundColor:
                        index % 2 === 0 ? "#e0f3e9" : "#00000000",
                    }}
                    // style={{ color: index % 2 !== 0 ? "white" : "black" }}
                  >
                    <td>{item.user.firstName}</td>
                    <td>
                      <Badge
                        variant="filled"
                        color={item.status === "approved" ? "green" : "red"}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.profilePicture}`}
                        alt="My pic"
                        crossOrigin="cross-origin"
                        width={40}
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:5000/${item.profilePicture}`
                          )
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.farmingLicense}`}
                        alt="My picx"
                        crossOrigin="cross-origin"
                        width={40}
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:5000/${item.farmingLicense}`
                          )
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.nationalIDPhoto}`}
                        alt="My pic"
                        crossOrigin="cross-origin"
                        width={40}
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:5000/${item.nationalIDPhoto}`
                          )
                        }
                      />
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.farmSamplePhoto}`}
                        alt="My pic"
                        crossOrigin="cross-origin"
                        width={40}
                        onClick={() =>
                          handleImageClick(
                            `http://localhost:5000/${item.farmSamplePhoto}`
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline"
                        color="green"
                        onClick={() => handleTextClick(item.letter)}
                      >
                        Application Letter
                      </Button>
                    </td>

                    <td>
                      {item.status === "pending" && (
                        <>
                          <Button
                            color="green"
                            uppercase
                            onClick={() => handleApprove(item._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            color="red"
                            uppercase
                            onClick={() => handleReject(item._id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </Table>

        {selectedImage && (
          <Modal
            opened={true}
            onClose={handleCloseModal}
            title="Image"
            size="xl"
          >
            <img
              alt={"modal"}
              src={selectedImage}
              fit="contain"
              crossOrigin="cross-origin"
            />
          </Modal>
        )}
        {selectedText && (
          <Modal opened={true} onClose={handleCloseModal} size="xl">
            {" "}
            <h2 style={{ color: "green" }}> Application Letter</h2>
            <p
              style={{
                fontFamily: "chiret",
                padding: "20px",
                textAlign: "justify",
                lineHeight: "2",
                textIndent: "20px",
              }}
            >
              {selectedText}
            </p>
          </Modal>
        )}
      </div>
    </>
  );
};

export default WaitlistTable;
