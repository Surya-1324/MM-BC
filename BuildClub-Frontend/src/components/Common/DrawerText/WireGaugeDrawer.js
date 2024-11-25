import React from 'react';
import './Drawer.css';

const WireGaugeDrawer = () => {
  return (
    <div className="slider-content">
      <p>
        Wire gauges, as defined by the Standard Wire Gauge (SWG), play a crucial role in 
        ensuring the appropriate selection of wire. The SWG number serves as a numerical 
        representation of the wire gauge, beginning with 1 for the thickest wire and ascending to 40 
        for the thinnest wire.
      </p>
      <table id="slider-table">
        <thead>
          <tr>
            <th>SWG</th>
            <th>Wire diameter in mm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15</td>
            <td>1.829</td>
          </tr>
          <tr>
            <td>16</td>
            <td>1.626</td>
          </tr>
          <tr>
            <td>17</td>
            <td>1.422</td>
          </tr>
          <tr>
            <td>18</td>
            <td>1.219</td>
          </tr>
          <tr>
            <td>19</td>
            <td>1.016</td>
          </tr>
          <tr>
            <td>20</td>
            <td>0.914</td>
          </tr>
          <tr>
            <td>21</td>
            <td>0.813</td>
          </tr>
          <tr>
            <td>22</td>
            <td>0.711</td>
          </tr>
          <tr>
            <td>23</td>
            <td>0.610</td>
          </tr>
          <tr>
            <td>24</td>
            <td>0.559</td>
          </tr>
          <tr>
            <td>25</td>
            <td>0.508</td>
          </tr>
          <tr>
            <td>26</td>
            <td>0.457</td>
          </tr>
          <tr>
            <td>27</td>
            <td>0.417</td>
          </tr>
          <tr>
            <td>28</td>
            <td>0.376</td>
          </tr>
          <tr>
            <td>29</td>
            <td>0.345</td>
          </tr>
          <tr>
            <td>30</td>
            <td>0.315</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default WireGaugeDrawer;
