/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = "home" | "about" | "disclaimer" | "privacy" | "learn";

export interface RecentConverter {
  id: string; // unique ID
  categoryId: string;
  categoryName: string;
  fromUnitId: string;
  fromUnitSymbol: string;
  toUnitId: string;
  toUnitSymbol: string;
  subCategoryName?: string;
  timestamp: number;
}
