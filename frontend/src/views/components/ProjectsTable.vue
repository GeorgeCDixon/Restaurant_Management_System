<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Table Reservations</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Table No.
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Estimated Order Value
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Status
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
                Status Of Arrangements
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2">
                  <div>
                    <!-- <img
                      src="../../assets/img/small-logos/logo-spotify.svg"
                      class="avatar avatar-sm rounded-circle me-2"
                      alt="spotify"
                    /> -->
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">Table 06</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">24/03/2024 18:30</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">Confirmed</span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">60%</span>
                  <div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-gradient-info"
                        role="progressbar"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style="width: 60%"
                      ></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                <button class="btn btn-link text-secondary mb-0">
                  <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
