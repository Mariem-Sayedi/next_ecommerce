"use client";

import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, onPageChange }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <nav aria-label="Page navigation">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item disabled"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
