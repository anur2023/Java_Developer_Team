import React, { useState } from 'react';
import './Table.css';

const Table = ({
                   columns = [],
                   data = [],
                   actions,
                   emptyMessage = "No data available",
                   striped = true,
                   hoverable = true,
                   bordered = false
               }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Ensure data is always an array
    const safeData = Array.isArray(data) ? data : [];

    // Ensure columns is always an array
    const safeColumns = Array.isArray(columns) ? columns : [];

    // Sort data
    const sortedData = React.useMemo(() => {
        let sortableData = [...safeData];
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [safeData, sortConfig]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return '⇅';
        }
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    const renderCellValue = (row, column) => {
        if (column.render) {
            return column.render(row);
        }
        return row[column.key] !== undefined ? row[column.key] : '-';
    };

    // If no columns provided, show error message
    if (safeColumns.length === 0) {
        return (
            <div className="table-container">
                <div className="table-error">
                    <p>⚠️ No columns defined for table</p>
                </div>
            </div>
        );
    }

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <table
                    className={`table ${striped ? 'table-striped' : ''} ${hoverable ? 'table-hover' : ''} ${bordered ? 'table-bordered' : ''}`}
                >
                    <thead className="table-header">
                    <tr>
                        {safeColumns.map((column, index) => (
                            <th
                                key={index}
                                className={column.sortable ? 'sortable' : ''}
                                onClick={() => column.sortable && handleSort(column.key)}
                                style={{ width: column.width || 'auto' }}
                            >
                                <div className="table-header-content">
                                    <span>{column.label}</span>
                                    {column.sortable && (
                                        <span className="sort-icon">{getSortIcon(column.key)}</span>
                                    )}
                                </div>
                            </th>
                        ))}
                        {actions && <th className="table-actions-header">Actions</th>}
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    {currentItems.length === 0 ? (
                        <tr>
                            <td colSpan={safeColumns.length + (actions ? 1 : 0)} className="table-empty">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        currentItems.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex}>
                                {safeColumns.map((column, colIndex) => (
                                    <td key={colIndex} className={column.className || ''}>
                                        {renderCellValue(row, column)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="table-actions">
                                        <div className="action-buttons">
                                            {actions.map((action, actionIndex) => (
                                                <button
                                                    key={actionIndex}
                                                    className={`action-btn ${action.className || ''}`}
                                                    onClick={() => action.onClick(row)}
                                                    title={action.label}
                                                >
                                                    {action.icon || action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="table-pagination">
                    <div className="pagination-info">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
                    </div>
                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first page, last page, current page, and pages around current
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            } else if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                            }
                            return null;
                        })}

                        <button
                            className="pagination-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
