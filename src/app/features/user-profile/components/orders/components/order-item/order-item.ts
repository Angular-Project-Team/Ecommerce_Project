import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Order, OrderStatus, OrderTimelineStep } from '../../../../../../core/models/user.model';

export interface TimelineDisplayStep {
    label: string;
    key: string;
    icon: string;
    completed: boolean;
    active: boolean;
    cancelled: boolean;
}

@Component({
    standalone: true,
    selector: 'app-order-item',
    imports: [CommonModule, DatePipe, CurrencyPipe],
    templateUrl: './order-item.html',
    styleUrl: './order-item.css',
})
export class OrderItem {
    @Input({ required: true }) order!: Order;
    @Output() cancelOrder = new EventEmitter<string>();

    timelineSteps: { label: string; key: string; icon: string }[] = [
        { label: 'Order Placed', key: 'pending', icon: 'placed' },
        { label: 'Order Confirmed', key: 'confirmed', icon: 'confirmed' },
        { label: 'Order Processed', key: 'processing', icon: 'processed' },
        { label: 'Ready to Ship', key: 'ready', icon: 'ready' },
        { label: 'Out for Delivery', key: 'shipped', icon: 'delivery' },
    ];

    private statusOrder: Record<string, number> = {
        pending: 0,
        confirmed: 1,
        processing: 2,
        ready: 3,
        shipped: 4,
        delivered: 5,
    };

    getTimelineSteps(): TimelineDisplayStep[] {
        const isCancelled = this.order.status === 'cancelled';
        const isDelivered = this.order.status === 'delivered';
        const currentLevel = this.statusOrder[this.order.status] ?? -1;

        const steps: TimelineDisplayStep[] = this.timelineSteps.map((step, index) => {
            let completed: boolean;
            let active: boolean;

            if (isCancelled) {
                const cancelLevel = this.order.cancelledAt
                    ? this.statusOrder[this.getCancelledAtStatus()] ?? 0
                    : 0;
                completed = index < cancelLevel;
                active = index === cancelLevel;
            } else {
                completed = isDelivered || index < currentLevel;
                active = !isDelivered && index === currentLevel;
            }

            return {
                label: step.label,
                key: step.key,
                icon: step.icon,
                completed,
                active,
                cancelled: false,
            };
        });

        if (isCancelled) {
            steps.push({
                label: 'Order Cancelled',
                key: 'cancelled',
                icon: 'cancelled',
                completed: false,
                active: false,
                cancelled: true,
            });
        }

        return steps;
    }

    /** Determine which status the order was at before cancellation */
    private getCancelledAtStatus(): string {
        return 'pending';
    }

    getProgressWidth(): string {
        if (this.isCancelled) {
            return '0%';
        }
        const currentLevel = this.statusOrder[this.order.status] ?? 0;
        const totalSteps = this.timelineSteps.length - 1;
        const percentage = Math.min((currentLevel / totalSteps) * 100, 100);
        return `calc(${percentage}% - 32px)`;
    }

    getTotalStepCount(): number {
        return this.isCancelled ? this.timelineSteps.length + 1 : this.timelineSteps.length;
    }

    get isCancelled(): boolean {
        return this.order.status === 'cancelled';
    }

    get isDelivered(): boolean {
        return this.order.status === 'delivered';
    }

    get canCancel(): boolean {
        return !this.isCancelled && !this.isDelivered;
    }

    get statusLabel(): string {
        if (this.isCancelled) return 'Order Cancelled';
        if (this.isDelivered)
            return `Delivered on ${new Date(this.order.deliveredDate!).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
        return `Estimated Delivery on ${new Date(this.order.estimatedDeliveryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }

    onCancel(): void {
        this.cancelOrder.emit(this.order.id);
    }
}
