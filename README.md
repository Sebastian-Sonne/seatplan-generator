# Dynamic Seatplan Generator

A React-based web application for dynamically creating and managing seatplans. Easily assign students to desks and share the results.

## Features

- Upload a list of students via Excel or add them manually.  
- Design a custom seatplan layout using an interactive grid.  
- Randomly assign students to desks, with the option to shuffle.  
- Export the seatplan as a shareable link.  

### Excel File Format
Ensure the Excel file has the following structure:  
- Each student should be listed in a new row, starting in **Column A**.  
- No additional formatting or data in other columns is required.  

## Technology Stack

- **Frontend**: React.js  
- **Styling**: Tailwind CSS  
- **State Management**: Redux  

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sebastian-Sonne/seatplan-generator.git
   cd dynamic-seatplan-generator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   // npm run css, to change styling
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Contributing

We welcome contributions! If you encounter any bugs or have feature suggestions, please open an issue or submit a pull request.  

## License

This project is not licensed under an open-source license and is the intellectual property of Sebastian Sonne. The source is available only as an educational resource and to accept fixes for minor mistakes.
