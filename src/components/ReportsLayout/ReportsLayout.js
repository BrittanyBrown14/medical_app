import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import './ReportsLayout.css'


function ReportsLayout()
{
    const name = sessionStorage.getItem("name"); // Get the email from session storage

    const reportInfo = [
        {
            serialNumber: 1,
            doctorName: 'Dr. One',
            doctorSpeciality: 'MidWife',
        
        },
        {
            serialNumber: 2,
            doctorName: 'Dr. Two',
            doctorSpeciality: 'Dentist',
        }
    ]

      const navigate = useNavigate();
      useEffect(() => {
           const authtoken = sessionStorage.getItem("auth-token");
           if (!authtoken) {
               navigate("/Login");
           }
      }, [navigate])

      const styles = {
        page: {
          flexDirection: 'column',
          backgroundColor: '#ffffff',
        },
        section: {
          margin: 20,
          padding: 20,
        },
        header: {
            fontSize: 24,
            textAlign: "center",
            marginBottom: 2,
        },
        mainInfo: {
            fontSize: 20,
            textAlign: "left",
        }
      };
      const openPdf = async () => {
        if (name !== "" || name !== null) {
            const blob = await pdf(<MyDocument />).toBlob();
            const pdfURL = URL.createObjectURL(blob);
            window.open(pdfURL, '_blank');            
        }
        else{
            alert('Your Report could not be generated')
        }
  
    } 

      const MyDocument = ({}) => (
        <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>Patient Report Card</Text>
          </View>
          <View style={styles.section}>
            <Text>Dear {name},</Text> 
            <Text>The Doctor has confirmed that everything is normal.</Text>
            <Text>Thank you for using our service</Text>
          </View>
        </Page>
      </Document>
      );

    return(
        <div>
            <table className="report--main">
                <thead className="report--header">
                    <tr className="report--row">
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>View Reports</th>
                        <th>Download Reports</th>
                    </tr>
                </thead>
                <tbody className="report--body">
                { reportInfo.map((info) => (
                        <tr key={info.serialNumber}>
                            <td>{info.serialNumber}</td>
                            <td>{info.doctorName}</td>
                            <td>{info.doctorSpeciality}</td>
                            <td> 
                                 <button className='report--button-download' onClick={openPdf}>View Report</button> 
                            </td> 

                            <td> 
                                <PDFDownloadLink document={<MyDocument />} fileName="Patient_Information.pdf">
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : <button className='report--button-download'>Download Report</button>
                                    }
                                </PDFDownloadLink>
                            </td> 
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default ReportsLayout;
