/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '@theme/Layout';

function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">Oops! You seemed to have clicked on a wrong link :(</h1>
            <p>Ok don't worry. Let's see if we can help you find the correct page.</p>
            <p>
            <ul>
                <li>If you are a developer looking for more info on building and deploying applications on Matic, please click <a href="https://docs.matic.network/docs/develop/getting-started">here</a>.</li>
                <li>If you are a validator....</li>
                <li>If you are looking to integrate your blockchain tools with Matic...</li>
                <li>If you wish to contribute code to the Matic codebase....</li>
            </ul> 
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;